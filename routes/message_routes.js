const express = require('express');
const message_controller = require('../controllers/message_controller');
const router = express.Router();

router.post('/user/message', message_controller);

module.exports = router;