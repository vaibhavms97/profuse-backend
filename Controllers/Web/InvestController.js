const User = require("../../Modals/User");
const Account = require("../../Modals/Account");
const Transaction = require("../../Modals/Transaction");
const Product = require("../../Modals/Product");
const UserEarnings = require("../../Modals/UserEarnings");
const AdminEarnings = require("../../Modals/AdminEarnings");
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;


exports.amountInvest = async (req, res, next) => {
    try {
        const userData = req.userData;
        const data = req.body;
        const account = await Account.findOne({ user_id: userData?._id })
        account.account_balance -= Number(data?.invest_amount)
        account.vested_balance += Number(data?.invest_amount)
        account.update_at = new Date()
        await account.save()

        const product = await Product.findOne({ _id: data?.product_id })
        product.product_amount = product?.product_amount > 0 ? product?.product_amount - Number(data?.invest_amount) : product?.product_amount
        product.update_at = new Date()
        await product.save()
        const investData = new Transaction({
            user_id: userData?._id,
            account_id: account?._id,
            product_id: data?.product_id,
            tnx_id: 'tnx' + (Math.random() + 1).toString(36).substring(7),
            amount: Number(data?.invest_amount),
            invest_percent: Number(data?.invest_percent),
            no_of_days: Number(data?.no_of_days),
            ends_at: data?.ends_at,
        })
        await investData.save();
        res.status(200).send({
            status: 200,
            message: 'Invest Successful',
            data: {}
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

exports.getTransactionList = async (req, res, next) => {
  const userData = req.userData;
    try {
        const options = {
            page: parseInt(req.query.page) || 1,
            // limit:parseInt(req.query.limit)||10,
            collation: {
                locale: 'en'
            },
            sort: {
                created_at: -1
            }
        }
        let query = [
            {
                '$lookup': {
                    'from': 'products',
                    'localField': 'product_id',
                    'foreignField': '_id',
                    'as': 'product_id'
                }
            }, 
            {
                '$unwind': {
                    'path': '$product_id',
                    'preserveNullAndEmptyArrays': true
                }
            },
            {
                '$match': {
                    user_id: new ObjectId(userData?._id),
                }
            }
        ]
        let queryAggregate = Transaction.aggregate(query);
        const transactions = await Transaction.aggregatePaginate(queryAggregate, options);
        res.send({
            status: 200,
            message: 'Transaction List',
            data: { transactions }
        })
    } catch (error) {
        next(error)
    }
}

exports.withdrawTransaction = async(req, res, next) => {
    try {
        const data = req.body;
        const transaction = await Transaction.findOne({_id: data.transaction_id});
        const currentDate = new Date();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        let adminEarnings = 0;
        let userEarnings = 0;
        let earnings = 0;
        const removeInvestedAmount = transaction.amount * -1;
        const totalEarnings = (transaction.invest_percent/100)* transaction.amount;
        if(transaction.ends_at < currentDate) {
            adminEarnings = Math.round((0.02*totalEarnings + Number.EPSILON)*100) / 100;
            userEarnings = Math.round((0.98*totalEarnings + Number.EPSILON)*100) / 100;
            earnings = Math.round((transaction.amount + userEarnings + Number.EPSILON)*100) / 100;
        } else {
            adminEarnings = Math.round((0.98*totalEarnings + Number.EPSILON)*100) / 100;
            userEarnings = Math.round((0.02*totalEarnings + Number.EPSILON)*100) / 100;
            earnings = Math.round((transaction.amount + userEarnings + Number.EPSILON)*100) / 100;
        }
        await Account.findOneAndUpdate({user_id: transaction.user_id.toString()}, {$inc: {account_balance: earnings, vested_balance: removeInvestedAmount, total_earnings: userEarnings, total_invested: transaction.amount}})
        await UserEarnings.findOneAndUpdate(
            {year: year, month: month, user_id: transaction.user_id.toString()}, 
            {$inc:{earnings: userEarnings}, $push: {transaction_ids: transaction._id.toString()}, $setOnInsert: {year: year, month: month}},
            {upsert: true, returnOriginal: false}
        )
        await AdminEarnings.findOneAndUpdate(
            {year: year, month: month}, 
            {$inc: {earnings: adminEarnings}, $push: {transaction_ids: transaction._id.toString()}, $setOnInsert: {year: year, month: month}},
            {upsert: true, returnOriginal: false}
        )
        await Transaction.findOneAndUpdate(
            {_id: transaction._id.toString()},
            {$set: {status: "Completed", withdrawn_at: currentDate, admin_earnings: adminEarnings, user_earnings: userEarnings}}
        )
        res.send({
            status: 200,
            message: 'Withdrawn transaction successfully',
        })
    } catch (error) {
        next(error)
    }
}