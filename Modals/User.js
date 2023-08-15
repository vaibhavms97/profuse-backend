const Mongoose = require("mongoose");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')

const User = new Mongoose.Schema({
    profile:{type:String},
    name: { type: String},
    email:{type:String},
    password: { type: String},
    phone: { type: String},
    address: { type: String},
    status: { type: Boolean,default:true},
    role:{type:String,enum:['User','Admin'],default:'User'},
    created_at: { type: Date, default: Date.now },
    updated_at:{type:Date,default:Date.now}
})

User.plugin(aggregatePaginate)
module.exports = Mongoose.model('User', User);

