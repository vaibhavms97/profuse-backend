const cron = require('node-cron');
const Account = require('../Modals/Account');
const AdminEarnings = require('../Modals/AdminEarnings');
const Transaction = require('../Modals/Transaction');
const UserEarnings = require('../Modals/UserEarnings');

const TransactionSheduler = async () => {
  cron.schedule("0 1 * * *", async () =>  {
    const currentDate = new Date();
    const dayBeforeYesterdayDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    dayBeforeYesterdayDate.setDate(dayBeforeYesterdayDate.getDate() - 2)
    const transactions = await Transaction.find({ends_at: {$lt: currentDate, $gt: dayBeforeYesterdayDate}})
    console.log(transactions)
    const accountUpdatepromises = [];
    const userEarningsPromises = [];
    const adminEarningsPromises = [];
    const transactionPromises = [];
    transactions.forEach(transaction => {
      if(transaction.status === "Pending") {
        const totalEarnings = (transaction.invest_percent/100)* transaction.amount;
        const adminEarnings = Math.round((0.02*totalEarnings + Number.EPSILON)*100) / 100;
        const userEarnings = Math.round((0.98*totalEarnings + Number.EPSILON)*100) / 100;
        const earnings = transaction.amount + userEarnings;
        const removeInvestedAmount = transaction.amount * -1;
        console.log("earnings", earnings, "adminEarnings", adminEarnings, "totalEarnings", totalEarnings);
        accountUpdatepromises.push(Account.findOneAndUpdate({user_id: transaction.user_id.toString()}, {$inc: {account_balance: earnings, vested_balance: removeInvestedAmount}}));
        userEarningsPromises.push(
          UserEarnings.findOneAndUpdate(
            {year: year, month: month, user_id: transaction.user_id.toString()}, 
            {$inc:{earnings: userEarnings}, $push: {transaction_ids: transaction._id.toString()}, $setOnInsert: {year: year, month: month}},
            {upsert: true, returnOriginal: false}
          )
        );
        adminEarningsPromises.push(
          AdminEarnings.findOneAndUpdate(
            {year: year, month: month}, 
            {$inc: {earnings: adminEarnings}, $push: {transaction_ids: transaction._id.toString()}, $setOnInsert: {year: year, month: month}},
            {upsert: true, returnOriginal: false}
          )
        );
        transactionPromises.push(
          Transaction.findOneAndUpdate(
            {_id: transaction._id.toString()},
            {$set: {status: "Completed", withdrawn_at: currentDate, admin_earnings: adminEarnings, user_earnings: userEarnings}}
          )
        )
      }
    })
    Promise.all(accountUpdatepromises)
    .then(res => {
      Promise.all(userEarningsPromises)
    })
    .then(res => {
      Promise.all(adminEarningsPromises)
    })
    .then(async (res) => {
      Promise.all(transactionPromises);
    });
  });
}


module.exports = TransactionSheduler