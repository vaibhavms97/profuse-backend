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
    invest_percent:{
        type:Number,
    },
    no_of_days:{
        type:Number,
    },
    status: {
        type: String,
        enum:['Pending','Completed'],
        default:'Pending'
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    ends_at: { type: Date },
    withdrawn_at: { type: Date },
})

Transaction.plugin(aggregatePaginate)
module.exports = Mongoose.model('Transaction', Transaction);

