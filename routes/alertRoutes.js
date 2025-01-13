const express = require('express');
const { createAlert, getAlerts, deleteAlert } = require('../controllers/alertController');
const { authenticateToken } = require('../middlewares/auth');
const { allowRoles } = require('../middlewares/roles');

const router = express.Router();

router.post('/', authenticateToken, allowRoles('admin', 'user'), createAlert);
router.get('/', authenticateToken, allowRoles('admin'), getAlerts);
router.delete('/:id', authenticateToken, allowRoles('admin'), deleteAlert);

module.exports = router;
