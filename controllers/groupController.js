// const {sequelize, Sequelize,}
const Groups = require('../models/group_model')
const UserGroups = require('../models/user_groups')





exports.saveGroupName = async function(req,res  ){
    console.log(req.body);
    group_name = req.body.groupName;
    adminId = req.body.userId;
    userId =  req.body.userId;
    console.log(group_name)
    try{
        const result = await Groups.create({group_name,adminId,userId})
        console.log(result);
        const groupGorupId = result.dataValues.gorupId;
        const userListUserId = userId;
        console.log("groupgroupid",groupGorupId);
        const result2 = await UserGroups.create({userListUserId,groupGorupId})
        res.status(200).json({result});
    }catch(err){
        console.log(err);
    }

}

exports.fetchGroups = async function(req, res){
    console.log("request of fetching group",req.params.id);
    try{
        const result = await Groups.findAll({where:{adminId:req.params.id}});
        console.log(result);
        res.status(200).json({result});
    }catch(error){
        console.log(error)
    }
}

exports.groupMessages = async function(req,res){
    console.log(req.body);
}
