const express = require('express');
const login = require('../controllers/login_controller');
const router = express.Router();

router.post('/user/login', login);

module.exports = router;