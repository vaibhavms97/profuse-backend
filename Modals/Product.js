const Mongoose = require("mongoose");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')

const Product = new Mongoose.Schema({
    product_name:{
        type:String,
    },
    product_description:{
        type:String,
    },
    product_offering1:{
        type:Number,
    },
    product_offering2:{
        type:Number,
    },
    product_offering3:{
        type:Number,
    },
    product_offering1_days:{
        type: Number,
    },
    product_offering2_days:{
        type: Number,
    },
    product_offering3_days:{
        type: Number,
    },
    product_amount:{
        type:Number,
    },
    product_image:{
        type: String,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

Product.plugin(aggregatePaginate)
module.exports = Mongoose.model('Product', Product);

