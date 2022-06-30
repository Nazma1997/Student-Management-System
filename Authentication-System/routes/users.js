const router = require('express').Router();
const userController = require('../controller/users');
/**
 * get user by id or email
 * @method GET
 */
 router.get('/:userId', userController.getUserById);

/**
 * update user by id or email
 * @method PUT
 */
 router.put('/:userId', () => {

});
/**
 * update user by id or email
 * @method PATCh
 */
 router.patch('/:userId', () => {

});
/**
 * delete user by id or email
 * @method DELETE
 */
 router.delete('/:userId', () => {

});

/**
 * Get all users
 * - filter
 * - pagination
 * - sorting
 * - select all properties
 * @route /api/v1/users
 * @method Get
 * @visibility private
 */
router.get('/users', userController.getUsers);
/**
 * create a new user
 * @method POST
 */
router.post('/', () => {

});



module.exports = router;