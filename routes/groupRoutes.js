const express = require('express');
const groupController = require('../controllers/groupController');


const router = express.Router();



router.post('/user/createGroup', groupController.saveGroupName);
router.get('/user/fetchGroups/:id', groupController.fetchGroups);
router.post('/user/group/message', groupController.groupMessages);


module.exports = router;