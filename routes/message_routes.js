const express = require('express');
const  {messageController,allMessageController}= require('../controllers/message_controller');
const router = express.Router();

router.post('/user/message', messageController);
router.get('/user/message', allMessageController);

module.exports = router;