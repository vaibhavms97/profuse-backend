const Mongoose = require("mongoose");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')

const AdminEarnings = new Mongoose.Schema({
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

AdminEarnings.plugin(aggregatePaginate)
module.exports = Mongoose.model('AdminEarnings', AdminEarnings);

