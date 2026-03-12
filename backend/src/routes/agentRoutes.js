const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const { registerAgent, listAgents, updateStatus } = require('../controllers/agentController');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/register', upload.array('documents', 5), registerAgent);
router.get('/', auth(['admin', 'super_admin']), listAgents);
router.patch('/:id/status', auth(['admin', 'super_admin']), updateStatus);

module.exports = router;
