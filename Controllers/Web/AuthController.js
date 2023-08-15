const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../Modals/User");
const Account = require("../../Modals/Account");
const { env } = require("../../Environments/env");
exports.userSignup = async (req, res, next) => {
  try {
    const data = req.body;
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const registration = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role:'User',
      created_on: new Date(),
    });

    const user = await registration.save();
    const accountData = new Account({
      user_id:user?._id,
    });

    const account = await accountData.save();
    user.password = null;

    res.send({
      status: 201,
      message: "User Register Successfully",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

exports.adminSignup = async (req, res, next) => {
  try {
    const data = req.body;
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const registration = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role:'Admin',
      created_on: new Date(),
    });

    const user = await registration.save();
    user.password = null;

    res.send({
      status: 201,
      message: "Admin Register Successfully",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

exports.userLogin = async(req,res,next)=>{
  try {
    const data = req.body;
    const user = req.userData;
    const isMatched = await bcrypt.compare(data.password, user.password);
    if (isMatched) {
      const token = jwt.sign(
        { _id: user._id, email: user.email },
        env().jwt_secret
      );
        user.password = null
      res.send({ status: 200, message: "Login successfully", data: { user,token } });
    } else {
      res.send({ status: 401, message: "Invalid email or password", data: {} });
    }
  } catch (error) {
    next(error)
  }
}

exports.getUserProfile = async(req,res,next)=>{
  try {
    const data = req.userData;
    const user = await User.findById({_id:data?._id});
    user.password = null;
    res.send({ status: 200, message: "User profile retrive successfully", data: { user } });
  } catch (error) {
    next(error)
  }
}
exports.updateUserProfile = async(req,res,next)=>{
  try {
    const userData = req.userData;
    const data = req.body;
    const userDa = await User.findOne({_id:userData?._id});
    userDa.name = data?.name;
    userDa.phone = data?.phone;
    userDa.address = data?.address;
   const user = await userDa.save();
   user.password = null
    res.send({ status: 200, message: "User profile update successfully", data: { user } });
  } catch (error) {
    next(error)
  }
}
