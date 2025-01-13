const roles = require('../utils/roles');
const Alert = require('../models/Alert');

const checkPermission = (action) => {
  return async (req, res, next) => {
    const userRole = req.user.role;
    const userId = req.user.id;

    // Check if the user's role allows the action
    if (!roles[userRole]?.can.includes(action)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Additional ownership check for certain actions
    if (['read_own_alert', 'delete_own_alert'].includes(action)) {
      const alertId = req.params.id;
      const alert = await Alert.findById(alertId);

      if (!alert) return res.status(404).json({ error: 'Alert not found' });

      if (alert.createdBy.toString() !== userId) {
        return res.status(403).json({ error: 'Access denied: not the owner' });
      }
    }

    next();
  };
};

module.exports = { checkPermission };
