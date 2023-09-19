const { Message } = require('../models/messages');
const jwt = require('jsonwebtoken');

const secret_key = process.env.SECRET_USER_ID_KEY;
console.log("here is the sec key", secret_key);


messageController = async function (req, res) {
    console.log(req.body);
    const { message, token } = req.body;
    console.log('token', token);

    jwt.verify(token, secret_key, (err, decoded) => {
        if (err) {
            console.error("JWT verification error:", err);
            res.status(401).json({ error: 'Unauthorized' });
        } else {
            console.log("decoded key", decoded);
            const newMessage = Message.create({message,userId:decoded.id});
            res.status(200).json({ message: 'Message sent successfully' });
        }
    });
}

allMessageController = async function(req,res){
    console.log(req.headers.authorisation);
    // jwt.verify(token)
    const token = req.headers.authorisation;

    await jwt.verify(token,secret_key, async (err,decoded)=>{
        if (err) {
            console.error("JWT verification error:", err);
            res.status(401).json({ error: 'Unauthorized' });
        } else {
            console.log("decoded key", decoded.id);
            const result = await  Message.findAll({where:{userId:decoded.id}});
            res.status(200).json({result});
        }
    })
}

module.exports = {messageController,allMessageController}