const {User} = require('../models/user_list');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_USER_ID_KEY;

console.log('secret_key while login', secretKey);


module.exports = loginController = async function (req, res) {
    // console.log(req.body);
    const {email,password} = req.body;
    const existingUser = await User.findOne({where:{email: email}});
    console.log("existing user id",existingUser.userId);
    if(existingUser){
        const isPasswordValid = await bcrypt.compare(password,existingUser.password);
        if(isPasswordValid){
            const token = jwt.sign({id: existingUser.userId}, secretKey)
            console.log("token while login",token)
            res.status(200).json({message:"password match", token:token,id:existingUser.userId});
        }
        else{
            res.status(201).json({message:"user not authorised"});
        }
    }
    else{
        res.status(404).json({message:"user does not exist please signup"})
    }
}