const Mongoose = require("mongoose");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')

const UserEarnings = new Mongoose.Schema({
    user_id: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    year: {
      type: Number,
    },
    month: {
      type: Number,
    },
    earnings: {
      type: Number,
    },
    transaction_ids: {
      type: Array,
    }
})

UserEarnings.plugin(aggregatePaginate)
module.exports = Mongoose.model('AdminEarnings', UserEarnings);

