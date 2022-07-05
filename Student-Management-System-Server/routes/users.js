const router = require('express').Router();
const userController = require('../controller/user');



/**
 * Update a user by id
 * @method PUT
 */
 router.put('/:userId', userController.postUserById);

/**
 * Update a user by id (some fields)
 * @method PATCH
 */
 router.patch('/:userId', userController.patchUserById);



/**
 * Get user by id or email
 * @method GET
 */

router.get('/:userId', userController.getUserById);
/**
 * Delete a user by id
 * @method DELETE
 */
router.delete('/:userId', userController.deleteUserById);
/**
 * Create a new user
 * @method POST
 */
 
router.post('/', userController.postUser);
/**
 * Get All users
 * @method GET
 */
router.get('/', userController.getAllUsers );





module.exports = router;