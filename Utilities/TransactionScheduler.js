const cron = require('node-cron');
const Account = require('../Modals/Account');
const AdminEarnings = require('../Modals/AdminEarnings');
const Transaction = require('../Modals/Transaction');
const UserEarnings = require('../Modals/UserEarnings');

const TransactionSheduler = async () => {
  cron.schedule("30 14 * * *", async () =>  {
    const currentDate = new Date();
    const dayBeforeYesterdayDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    dayBeforeYesterdayDate.setDate(dayBeforeYesterdayDate.getDate() - 2)
    const transactions = await Transaction.find({ends_at: {$lt: currentDate, $gt: dayBeforeYesterdayDate}})
    const accountUpdatepromises = [];
    const userEarningsPromises = [];
    const adminEarningsPromises = [];
    transactions.forEach(transaction => {
      if(transaction.status === "Pending") {
        const totalEarnings = (transaction.invest_percent/100)* transaction.amount;
        const adminEarnings = Math.round((0.02*totalEarnings + Number.EPSILON)*100) / 100;
        const userEarnings = Math.round((0.98*totalEarnings + Number.EPSILON)*100) / 100;
        const earnings = transaction.amount + userEarnings;
        const removeInvestedAmount = transaction.amount * -1
        accountUpdatepromises.push(Account.updateOne({_id: transaction.user_id.toString()}, {$inc: {account_balance: earnings}, $inc: {vested_balance: removeInvestedAmount}}));
        userEarningsPromises.push(UserEarnings.updateOne({year: year, month: month, user_id: transaction.user_id.toString()}, {$inc:{earnings: userEarnings}, $push: {transaction_ids: transaction._id.toString()}}));
        adminEarningsPromises.push(AdminEarnings.updateOne({year: year, month: month}, {$inc: {earnings: adminEarnings}, $push: {transaction_ids: transaction._id.toString()}}));
      }
    })
    await Transaction.updateMany({ends_at: {$lt: currentDate, $gt: dayBeforeYesterdayDate}}, {$set: {status: "Completed", withdrawn_at: currentDate}})
    Promise.all(accountUpdatepromises)
    .then(res => console.log(res));
    Promise.all(userEarningsPromises)
    .then(res => console.log(res));
    Promise.all(adminEarningsPromises)
    .then(res => console.log(res));
  });
  // const id = [
  //   ObjectId("64f0894e7d58f257ac938273"),
  //   ObjectId("64f0895c7d58f257ac93827f"),
  //   ObjectId("64f089627d58f257ac93828b"),
  //   ObjectId("64f089697d58f257ac938297")
  // ]
  // const res = await Transaction.updateOne({_id: id[0]}, {$set: {status: "Completed"}})
  // console.log(res);
  // const currentDate = new Date();
  // Transaction.updateMany({ends_at: {$lt: currentDate}}, {$set: {status: "Pending"}})
  // .exec()
  // .then(res => console.log(res))
}


module.exports = TransactionSheduler