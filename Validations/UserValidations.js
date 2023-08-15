const { body, query, check } = require('express-validator'); // express validator import
const User = require('../Modals/User');

exports.userRegister = ((req, res) => {
    return [
        body('email', 'Email is Required').isEmail()
        .custom((result, { req }) => {
            return User.findOne({ email: result })
                .then(user => {
                    if (user) {
                        throw new Error('Email Already Exist');
                    } else {
                        return true;
                    }
                })
        }),
        // check('password', 'Password is Required').isLength({ min: 8 })
        // .withMessage('Password Must Be at Least 8 Characters')
        // .matches('[0-9]').withMessage('Password Must Contain a Number')
        // .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')
        // .matches('[a-z]').withMessage('Password Must Contain an Lowercase Letter')
        // .trim().escape()
    ];
})

exports.userLogin = (req, res) => {
    return [
        check('password', 'Password is Required')
        // .isLength({ min: 8 })
        // .withMessage('Password Must Be at Least 8 Characters')
        // .matches('[0-9]').withMessage('Password Must Contain a Number')
        // .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')
        // .matches('[a-z]').withMessage('Password Must Contain an Lowercase Letter')
        .trim().escape()
        .custom((result,{ req }) => {
            const data = req.body;
            return User.findOne({ email: data.email })
                .then(user => {
                    if (user) {
                        req.userData = user; //to save user details in req
                    } else {
                        throw new Error('User Does Not Exist');
                    }
                })

        })
    ]
}

exports.checkUserStatus = (req,res)=>{
    return [
        check('email','Email is required').custom((result,{req})=>{
            const data = req?.userData
            return User.findOne({email:data?.email}).then(user=>{
                if (user?.status == true) {
                    console.log(user);
                    return true
                } else {
                    throw new Error('Your account is blocked.Kindly contact to admin');
                }
            })
        })
    ]
}