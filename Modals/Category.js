const Mongoose = require("mongoose");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')

const Category = new Mongoose.Schema({
    category_description:{
        type:String,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

Category.plugin(aggregatePaginate)
module.exports = Mongoose.model('Category', Category);

