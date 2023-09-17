const { User } = require('../models/user_list')
const bcrypt = require('bcrypt');

exports.signupController = async (req, res) => {
    console.log(req.body);
    const { name, email, number, password } = req.body;
    try {
        const alreadyExists = await User.findOne({
            where: {
                email: email
            }
        })
        if (alreadyExists) {
            return res.status(202).json({ message: "user already exists" })
        }
        else {
            bcrypt.hash(password, 10, async (err, hash) => {
                try {
                    const newUser = await User.create({ name, email, number, password: hash });
                    res.status(201).json({ message: 'SignUp Success!!', user: newUser });
                } catch (err) {
                    console.log("error creating the table", err)
                }
            })
        }
    }
    catch (err) {
        console.log(err);
    }
}