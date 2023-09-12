const Product = require('../../Modals/Product');

exports.addProduct = async(req,res,next)=>{
    try {
        const data = req.body;
        const createProduct = new Product({
            product_name:data?.product_name,
            product_description:data?.product_description,
            product_offering1:data?.product_offering1,
            product_offering2:data?.product_offering2,
            product_offering3:data?.product_offering3,
            product_offering1_days: data?.product_offering1_days,
            product_offering2_days: data?.product_offering2_days,
            product_offering3_days: data?.product_offering3_days,
            product_amount:data?.product_amount,
            product_image: data?.product_image,
            created_on: new Date(),
          });

          const product = await createProduct.save()

          res.status(201).send({
            status: 201,
            message: "Product Created Successfully",
            data: { product },
          });

    } catch (error) {
        next(error)
    }
}

exports.getProductList=async(req,res,next)=>{
    try {
        const options={
            page:parseInt(req.query.page)||1,
            // limit:parseInt(req.query.limit)||10,
            collation:{
                locale:'en'
            },
            sort:{
                created_at:-1
            }
        }
        let query = [
            {
              '$lookup': {
                'from': 'categories', 
                'localField': 'category_id', 
                'foreignField': '_id', 
                'as': 'category_id'
              }
            }, {
              '$unwind': {
                'path': '$category_id', 
                'preserveNullAndEmptyArrays': true
              }
            }, {
                '$match': {
                    product_amount: {
                        "$gt": 0
                    }
                }
            }
          ]
          let queryAggregate = Product.aggregate(query);
        const products = await Product.aggregatePaginate(queryAggregate,options);
        res.send({
            status:200,
            message:'Product List',
            data:{products}
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteProduct=async(req,res,next)=>{
    try {
        await Product.deleteOne({_id:req.query?._id});
        res.status(200).send({
            status:200,
            message:'Product Deleted Successfully',
            data:{}
        })
    } catch (error) {
        next(error)
    }
}

exports.editProduct = async(req,res,next)=>{
    try {
        const data = req.body;
        const product = await Product.findOne({_id:data?._id});
        product.product_name = data?.product_name;
        product.product_description = data?.product_description;
        product.product_offering1 = data?.product_offering1;
        product.product_offering2 = data?.product_offering2;
        product.product_offering3 = data?.product_offering3;
        product.product_offering1_days =  data?.product_offering1_days;
        product.product_offering2_days =  data?.product_offering2_days;
        product.product_offering3_days =  data?.product_offering3_days;
        product.product_amount = data?.product_amount;
        product.updated_on =  new Date();
        const updateProduct = await product.save();
        res.send({ status: 200, message: "Product update successfully", data: { updateProduct } });
    } catch (error) {
        next(error)
    }
}

exports.deleteProducts = async(req, res, next) => {
    try {
        await Product.deleteMany({"product_name": req.body.name})
        res.status(200).send({
            status:200,
            message:'Products Deleted Successfully',
            data:{}
        })
    } catch (error) {
        next(error)
    }
}