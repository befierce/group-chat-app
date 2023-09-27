const express = require('express');
const groupController = require('../controllers/groupController');


const router = express.Router();



router.post('/user/createGroup', groupController.saveGroupName);
router.get('/user/fetchGroups/:id', groupController.fetchGroups);
router.post('/user/group/message', groupController.groupMessages);
router.get('/user/getallgroupmessage', groupController.fetchGroupMessages);
router.get('/user/listOfAllUsers',groupController.fetchAllUsers);
router.get('/user/listOfGroupUsers/:groupId/:adminId',groupController.fetchAllGroupMembers);
router.post('/user/addUser/to/group',groupController.addUserToAGroup);
router.get('/user/newGroupMessages/:AGRMID/:AGID',groupController.newGroupMessageController);

module.exports = router;



