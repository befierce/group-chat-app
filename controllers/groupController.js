const { sequelize, Sequelize } = require('../database/connection');
const Groups = require('../models/group_model')
const UserGroups = require('../models/user_groups')
const UserGroupMessages = require('../models/group_message_models')
const { User } = require('../models/user_list');

// const json = require('json')

exports.saveGroupName = async function (req, res) {
    // console.log(req.body);
    group_name = req.body.groupName;
    adminId = req.body.userId;
    userId = req.body.userId;
    // console.log(group_name)
    try {
        const result = await Groups.create({ group_name, adminId, userId })
        // console.log(result);
        const groupGorupId = result.dataValues.gorupId;
        const userListUserId = userId;
        console.log("groupgroupid", groupGorupId);
        const result2 = await UserGroups.create({ userListUserId, groupGorupId })
        res.status(200).json({ result });
    } catch (err) {
        console.log(err);
    }

}

// exports.newGroupMessageController = async function (req, res) {
//     console.log("bosy of new messages request", req.params);
//     const queryParam = JSON.parse(req.query.ActiveGroupAndItsLatestMessageId);
//     // let offsetMessageId = req.params.id;
//     // try {
//     //     const newMessages = await Message.findAll({
//     //         where: {
//     //             id: {
//     //                 [Sequelize.Op.gt]: offsetMessageId
//     //             }
//     //         }
//     //     })
//     //     // console.log(newMsessages);
//     //     res.status(200).json({ newMessages });
//     // }
//     // catch (error) {
//     //     console.log(error);
//     // }
// }
exports.newGroupMessageController = async function (req, res) {
    // console.log("*******star", req.params)

    // Parse AGRMID and AGID as numbers
    const AGRMID = parseInt(req.params.AGRMID);
    const AGID = parseInt(req.params.AGID);

    try {
        const newGroupMessages = await UserGroupMessages.findAll({
            where: {
                groupGorupId: AGID,
                id: { [Sequelize.Op.gt]: AGRMID }
            },
            // offset:  // Set offset to 0 for now, you can adjust it as needed
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });

        // console.log(newGroupMessages);

        res.status(200).json({ messages: newGroupMessages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}



exports.fetchGroups = async function (req, res) {
    // console.log("Request to fetch groups for user ID:", req.params.id);
    try {
        const result = await UserGroups.findAll({
            where: {
                userListUserId: req.params.id
            },
            include: [
                {
                    model: Groups,
                    as: 'group', 
                    attributes: ['group_name'],
                },
            ],
        });
        // console.log("result after querry",result);
        const groupNames = result.map(userGroup => userGroup.group.group_name);

        // console.log(groupNames);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



exports.groupMessages = async function (req, res) {
    // console.log(req.body);
    const { message, userId, groupId } = req.body;
    console.log(message);
    console.log(userId);
    console.log(groupId);
    const io = req.app.get('io');
    try {
        const result = await UserGroupMessages.create({ message: message, groupGorupId: groupId, userListUserId: userId })
        // console.log("result after saving group message", result);
        const nameAndId = await User.findOne({where:{
            userId:userId,
        }})
        io.emit('recieve-group-message', {result,nameAndId});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: "error while saving group message" })
        console.log("error while saving message", error);
    }
}





exports.fetchGroupMessages = async function (req, res) {
    // console.log(req.headers)
    const { groupid } = req.headers;
    console.log("group id", groupid)
    try {
        const result = await UserGroupMessages.findAll({
            where: {
                groupGorupId: groupid
            },include: {
                model: User,
                attributes: ['name'],
            }
        });
        // console.log("r-----",result)
        res.status(200).json(result);
    } catch (error) {
        console.log('error', error);
        res.status(200).json({ message: 'error fetching group messages' });
    }
}

exports.fetchAllUsers = async function (req, res) {
    // console.log('req reaching the server');

    try {
        const result = await User.findAll({
            attributes: ['name', 'email', 'userId'],
        });

        // console.log(result);
        res.status(200).json({ result });
    } catch (error) {
        console.log(error);
    }
}


exports.addUserToAGroup = async function (req, res) {
    // console.log(req.body);
    // let userListUserId = userId

    const { groupId, userId } = req.body;
    userListUserId = userId;
    groupGorupId = groupId
    try {
        const existingUser = await UserGroups.findOne({
            where: {
                userListUserId: userId,
                groupGorupId: groupId
            }
        })
        if (!existingUser) {
            const result = await UserGroups.create({ userListUserId, groupGorupId });
            res.status(200).json(result);

        } else {
            res.status(201).json({ message: "user already present in the group" })
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'some error happened' });
    }
}

exports.fetchAllGroupMembers = async function (req, res) {
    const groupId = req.params.groupId; // Extract the 'groupId' from the request parameters

    try {
        const result = await UserGroups.findAll({
            where: {
                groupGorupId: groupId 
            },
            include:{
                model:User,
                attributes:['email']
            }
        });
        // console.log("(*(*(*(",result)
        res.status(200).json({result});
        // Handle the result, e.g., send it as a response
        // res.json(result);
    } catch (error) {
        console.log(error);
        // Handle the error, e.g., send an error response
        res.status(500).json({ error: 'Internal server error' });
    }
}