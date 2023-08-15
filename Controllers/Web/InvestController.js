const User = require("../../Modals/User");
const Account = require("../../Modals/Account");
const Transaction = require("../../Modals/Transaction");
const Product = require("../../Modals/Product");

exports.amountInvest = async (req, res, next) => {
    try {
        const userData = req.userData;
        const data = req.body;
        console.log(data);
        const account = await Account.findOne({ user_id: userData?._id })
        account.account_balance -= Number(data?.invest_amount)
        account.vested_balance += Number(data?.invest_amount) * Number(data?.invest_percent)
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
            amount: Number(data?.invest_amount)
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
            }, {
                '$unwind': {
                    'path': '$product_id',
                    'preserveNullAndEmptyArrays': true
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