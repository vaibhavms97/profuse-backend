const mongoose = require("mongoose")
const Transaction = require("../../Modals/Transaction");
const UserEarnings = require("../../Modals/UserEarnings");
const ObjectId = mongoose.Types.ObjectId;


exports.getUserEarnings = async (req,res,next) => {
  const userData = req.userData;
  console.log("id", userData?._id);
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
        }, {
          '$match' : {
            status: "Completed",
            user_id: new ObjectId(userData?._id)
          }
        }
    ]
    let queryAggregate = Transaction.aggregate(query);
    const transactions = await Transaction.aggregatePaginate(queryAggregate, options);
    res.send({
        status: 200,
        message: 'User Earning List',
        data: { transactions }
    })
  } catch (error) {
    next(error)
  }
}

exports.getMonthlyEarnings = async (req,res,next) => {
  try {
    const userData = req.userData;
    const from = parseInt(req.query.from)
    const to = parseInt(req.query.to)
    console.log("userData",userData?._id)
    const earnings = await UserEarnings.find({user_id: userData?._id, month: {$gte: from, $lte: to}})
    res.send({
      status: 200,
      message: 'User Earning List',
      data: { earnings }
    })
  } catch (error) {
    next(error)
  }
}