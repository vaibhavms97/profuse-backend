const User = require("../../Modals/User");

exports.getUsersList=async(req,res,next)=>{
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
              '$match': {
                'role': 'User'
              }
            }
          ]
          let queryAggregate = User.aggregate(query);
        const users = await User.aggregatePaginate(queryAggregate,options);
        res.send({
            status:200,
            message:'Users List',
            data:{users}
        })
    } catch (error) {
        next(error)
    }
}

exports.changeUserStatus=async(req,res,next)=>{
    try {
        const data = req.body;
        const userData = await User.findOne({_id:data?._id});
        userData.status = !userData?.status
        const user = await userData.save()
        res.send({
            status:200,
            message:'User Status Update',
            data:{user}
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteUser=async(req,res,next)=>{
    try {
        const data = req.body;
        await User.deleteOne({_id:data?._id});
        res.send({
            status:200,
            message:'User Deleted Successfully',
            data:{}
        })
    } catch (error) {
        next(error)
    }
}