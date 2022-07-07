const router = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('../routes/users');
const authenticate = require('../middleware/authenticate');
const adminAttendanceRoute = require('./admin-attendance');

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/users', authenticate,  userRoutes);
router.use('/api/v1/admin/attendance', authenticate, adminAttendanceRoute )

module.exports = router;
