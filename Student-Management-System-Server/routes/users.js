const router = require('express').Router();
const userController = require('../controller/user');



/**
 * Update a user by id
 * @method PUT
 */
 router.put('/:userId', () => {});

/**
 * Update a user by id (some fields)
 * @method PATCH
 */
 router.patch('/:userId', () => {});



/**
 * Get user by id or email
 * @method GET
 */

router.get('/:userId', () => {});
/**
 * Delete a user by id
 * @method DELETE
 */
router.delete('/:userId', () => {});
/**
 * Create a new user
 * @method POST
 */
 
router.post('/', () => {});
/**
 * Get All users
 * @method GET
 */
router.get('/', userController.getAllUsers );





module.exports = router;