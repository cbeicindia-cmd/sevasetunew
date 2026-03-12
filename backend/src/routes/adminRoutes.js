const express = require('express');
const auth = require('../middleware/auth');
const { stats } = require('../controllers/adminController');

const router = express.Router();
router.get('/stats', auth(['admin', 'super_admin']), stats);

module.exports = router;
