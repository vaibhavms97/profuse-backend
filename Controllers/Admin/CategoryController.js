const Category = require('../../Modals/Category');

exports.addCategory = async(req,res,next)=>{
    try {
        const data = req.body;
        const createCategory = new Category({
            category_description: data.category_description,
            created_on: new Date(),
          });

          const category = await createCategory.save()

          res.status(201).send({
            status: 201,
            message: "Category Created Successfully",
            data: { category },
          });

    } catch (error) {
        next(error)
    }
}

exports.getCategoriesList=async(req,res,next)=>{
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
           
          ]
          let queryAggregate = Category.aggregate(query);
        const categories = await Category.aggregatePaginate(queryAggregate,options);
        res.send({
            status:200,
            message:'Categories List',
            data:{categories}
        })
    } catch (error) {
        next(error)
    }
}