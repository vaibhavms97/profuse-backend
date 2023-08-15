const Account= require("../../Modals/Account");


exports.getDashboardData = async (req, res, next) => {
    try {
        const userData = req.userData;
        const accountData = await Account.findOne({ user_id: userData?._id })
        console.log(accountData);
        res.send({ status: 200, message: 'Dashboard retrieve succcessfully.', data: { accountData } })
    } catch (error) {
        next(error)
    }
}