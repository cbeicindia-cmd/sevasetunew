const express = require('express');
const auth = require('../middleware/auth');
const { listSchemes, upsertScheme } = require('../controllers/schemeController');

const router = express.Router();
router.get('/', listSchemes);
router.post('/', auth(['admin', 'super_admin']), upsertScheme);

module.exports = router;
