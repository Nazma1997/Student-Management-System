const router = require('express').Router();
const {getEnable, getDisable, getRunning} = require('../controller/admin-attendance');




router.get('/enable', getEnable);
router.get('/disable', getDisable);
router.get('/running', getRunning);


module.exports = router;

