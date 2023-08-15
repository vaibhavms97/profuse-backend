const Mongoose = require("mongoose");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')

const Account = new Mongoose.Schema({
    user_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    account_balance:{
        type:Number,
        default:0
    },
    vested_balance:{
        type:Number,
        default:0
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

Account.plugin(aggregatePaginate)
module.exports = Mongoose.model('Account', Account);

