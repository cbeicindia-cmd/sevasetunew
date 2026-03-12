const express = require('express');
const { requestOtp, registerCitizen, login } = require('../controllers/authController');

const router = express.Router();
router.post('/otp/request', requestOtp);
router.post('/citizen/register', registerCitizen);
router.post('/login', login);

module.exports = router;
