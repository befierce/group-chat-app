const { Message ,sequelize} = require('../models/messages');
const { Sequelize, Op } = require('sequelize');
const jwt = require('jsonwebtoken');

const secret_key = process.env.SECRET_USER_ID_KEY;
console.log("here is the sec key", secret_key);


messageController = async function (req, res) {
    console.log(req.body);
    const { message, token } = req.body;
    console.log('token', token);

    jwt.verify(token, secret_key, async (err, decoded) => {
        if (err) {
            console.error("JWT verification error:", err);
            res.status(401).json({ error: 'Unauthorized' });
        } else {
            console.log("decoded key", decoded);
            const newMessage = await Message.create({ message, userId: decoded.id });
            console.log("newMessage", newMessage)
            res.status(200).json({ message: 'Message sent successfully', currentMessage: newMessage });
        }
    });
}

allMessageController = async function (req, res) {
    console.log(req.headers.authorisation);
    // jwt.verify(token)
    const token = req.headers.authorisation;

    await jwt.verify(token, secret_key, async (err, decoded) => {
        if (err) {
            console.error("JWT verification error:", err);
            res.status(401).json({ error: 'Unauthorized' });
        } else {
            console.log("decoded key", decoded.id);
            const result = await Message.findAll();
            res.status(200).json({ result });
        }
    })
}

newMessageController = async function (req, res) {
    console.log("bosy of new messages request", req.params);
    let offsetMessageId = req.params.id;
    try{
        const newMessages = await Message.findAll({
            where: {
                id: {
                    [Sequelize.Op.gt]: offsetMessageId
                }
            }
        })
        // console.log(newMsessages);
        res.status(200).json({newMessages});
    }
    catch(error){
        console.log(error);
    }
}





module.exports = { messageController, allMessageController, newMessageController }