const express = require('express');
const  {messageController,allMessageController,newMessageController}= require('../controllers/message_controller');
const router = express.Router();

router.post('/user/message', messageController);
router.get('/user/message', allMessageController);
router.get('/user/newMessage/:id', newMessageController);

module.exports = router;