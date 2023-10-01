const { Message, sequelize } = require('../models/messages');
const { Sequelize, Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user_list');


const secret_key = process.env.SECRET_USER_ID_KEY;
console.log("here is the sec key", secret_key);


messageController = async function (req, res) {
    // console.log(req.body);
    const { message, token } = req.body;
    console.log('token', token);
    const io = req.app.get('io');

    jwt.verify(token, secret_key, async (err, decoded) => {
        if (err) {
            console.error("JWT verification error:", err);
            res.status(401).json({ error: 'Unauthorized' });
        } else {
            console.log("decoded key", decoded);
            const newMessage = await Message.create({ message, userId: decoded.id });
            const nameAndId = await User.findOne({where:{
                userId:decoded.id,
                
            }
            // attributes: ['name']
        })
            io.emit('recieve-message', {newMessage,nameAndId});
            res.status(200).json({ message: 'Message sent successfully', currentMessage: newMessage });
        }
    });
}

allMessageController = async function (req, res) {
    // console.log(req.headers.authorisation);
    // jwt.verify(token)
    const token = req.headers.authorisation;

    await jwt.verify(token, secret_key, async (err, decoded) => {
        if (err) {
            console.error("JWT verification error:", err);
            res.status(401).json({ error: 'Unauthorized' });
        } else {
            console.log("decoded key", decoded.id);
            try {
                const result = await Message.findAll({
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                });

                // console.log("*******", result);
                res.status(200).json({ result });
            } catch (error) {
                console.log(error);
            }


        }
    })
}


// const jwt = require('jsonwebtoken'); // Import jwt module
// const secret_key = 'your_secret_key'; // Replace with your actual secret key

// allMessageController = async function (req, res) {
//     console.log(req.headers.authorisation);
//     const token = req.headers.authorisation;

//     await jwt.verify(token, secret_key, async (err, decoded) => {
//         if (err) {
//             console.error("JWT verification error:", err);
//             res.status(401).json({ error: 'Unauthorized' });
//         } else {
//             console.log("decoded key", decoded.id);

//             try {
//                 // Fetch all messages and include the associated User model to get user names
//                 const messages = await Message.findAll({
//                     include: {
//                         model: User,
//                         attributes: ['name'], // Include only the 'name' attribute from User
//                     },
//                 });

//                 const formattedMessages = messages.map((message) => ({
//                     id: message.id,
//                     message: message.message,
//                     userId: message.userId,
//                     userName: message.User.name, // Access the user's name from the associated User model
//                 }));

//                 res.status(200).json({ result: formattedMessages });
//             } catch (error) {
//                 console.error("Error while fetching messages:", error);
//                 res.status(500).json({ error: 'Internal Server Error' });
//             }
//         }
//     });
// };


newMessageController = async function (req, res) {
    // console.log("bosy of new messages request", req.params);
    let offsetMessageId = req.params.id;
    try {
        const newMessages = await Message.findAll({
            where: {
                id: {
                    [Sequelize.Op.gt]: offsetMessageId
                }
            }
        })
        // console.log(newMsessages);
        res.status(200).json({ newMessages });
    }
    catch (error) {
        console.log(error);
    }
}





module.exports = { messageController, allMessageController, newMessageController }