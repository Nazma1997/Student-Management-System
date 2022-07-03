const router = require('express').Router();
const {registerController, loginController} = require('../controller/auth');


/**
 * Register a User
 */
 router.post('/register', registerController );

 /**
  * Login a User
  */
 
 router.post('/login', loginController);


 module.exports = router;

