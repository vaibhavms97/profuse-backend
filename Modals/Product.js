const Mongoose = require("mongoose");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')

const Product = new Mongoose.Schema({
    category_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
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
    product_amount:{
        type:Number,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

Product.plugin(aggregatePaginate)
module.exports = Mongoose.model('Product', Product);

