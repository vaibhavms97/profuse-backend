const mongoose = require("mongoose")
const Transaction = require("../../Modals/Transaction");

exports.getAdminEarnings = async (req,res,next) => {
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
          }
        }
    ]
    let queryAggregate = Transaction.aggregate(query);
    const transactions = await Transaction.aggregatePaginate(queryAggregate, options);
    res.send({
        status: 200,
        message: 'Earning List',
        data: { transactions }
    })
  } catch (error) {
    next(error)
  }
}