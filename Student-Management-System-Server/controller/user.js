const User = require('../models/User');
const userService = require('../service/user');
const  authService = require('../service/auth');
const error = require('../utils/error');


/**
 * Get All Users
 */
const getAllUsers = async(req, res, next) => {
     try{
        
        const users = await userService.findUsers();
        return res.status(200).json(users);
     }
     catch(e){
      next(e)
     }
};
/**
 * Get User by Id
 */
const getUserById = async(req, res, next) => {
      const userId = req.params.userId;

      try{
        
        const user = await userService.findUserByProperty('_id', userId);

        if(!user){
             throw error('User not found', 404);    
           }

           return res.status(200).json(user);
      }
      catch (e) {
        next(e)
      }
};

/**
 * Post a new user
 */
const postUser = async(req, res, next) => {
  const {name, email, password, roles, accountStatus} = req.body;

  try{
    const user = await authService.registerService({
      name, 
      email,
      password,
      roles,
      accountStatus
    });

    return res.status(201).json(user)
  }
  catch(e){
    next(e)
  }
 
};

/**
 *  Delete a user by id 
 */
const deleteUserById = async(req, res, next) => {
  
  const userId = req.params.userId;

  try{
       const user = await userService.findUserByProperty('_id', userId);

       if(!user){
        throw error ('User not found', 404);
       }

       await user.remove();

       return res.status(203).json({message: 'User Deleted Successfully ', user})
  }
  catch(e) {
    next(e)
  }
     

};

const postUserById = (req, res, next) => {};

const patchUserById = (req, res, next) => {};






module.exports = {
  getAllUsers,
  getUserById,
  postUser,
  postUserById,
  patchUserById,
  deleteUserById,
}