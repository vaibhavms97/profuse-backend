const Account = require("../../Modals/Account");

exports.depostFunds = async (req, res, next) => {
    try {
        const userData = req.userData;
        const data = req.body;

        const accountData = await Account.findOne({ user_id: userData?._id })
        accountData.account_balance += Number(data?.account_balance)
        const account = await accountData.save();

        res.send({
            status: 200,
            message: "Amount Add Successfully",
            data: { account }
        })
    } catch (error) {
        next(error)
    }
}
exports.withdrawFunds = async (req, res, next) => {
    try {
        const userData = req.userData;
        const data = req.body;

        const accountData = await Account.findOne({ user_id: userData?._id })
        if (accountData?.account_balance>0) {
            accountData.account_balance = accountData?.account_balance-data?.account_balance
        const account = await accountData.save();

        res.send({
            status: 200,
            message: "Amount Withdraw Successfully",
            data: { account }
        })
        } else {
            res.send({
                status: 400,
                message: "You have insufficent balance",
                data: {  }
            })
        }
        
    } catch (error) {
        next(error)
    }
}