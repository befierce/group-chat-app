const {User} = require('../models/user_list');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_USER_ID_KEY;

console.log('secret_key', secretKey);


module.exports = loginController = async function (req, res) {
    // console.log(req.body);
    const {email,password} = req.body;
    const existingUser = await User.findOne({where:{email: email}});
    console.log(existingUser.id);
    if(existingUser){
        const isPasswordValid = await bcrypt.compare(password,existingUser.password);
        if(isPasswordValid){
            const token = jwt.sign({id: existingUser.id}, secretKey)
            console.log("token",token)
            res.status(200).json({message:"password match", token:token});
        }
        else{
            res.status(401).json({message:"user not authorised"});
        }
    }
    else{
        res.status(404).json({message:"user does not exist please signup"})
    }
}