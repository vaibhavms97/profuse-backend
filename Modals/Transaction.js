const Mongoose = require("mongoose");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')

const Transaction = new Mongoose.Schema({
    user_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    account_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    product_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    tnx_id:{
        type:String,
    },
    amount:{
        type:Number,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

Transaction.plugin(aggregatePaginate)
module.exports = Mongoose.model('Transaction', Transaction);

