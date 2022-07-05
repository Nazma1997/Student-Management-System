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
        
       // return res.status(203).send()
       return res.status(203).json({message: 'User Deleted Successfully ', user}).send()
  }
  catch(e) {
    next(e)
  }
     

};

/**
 * Update user (some field)
 */

const patchUserById = async(req, res, next) => {
      const userId = req.params.userId;
      const {name, roles, accountStatus} = req.body;

      try{
        const user = await userService.findUserByProperty('_id', userId);


        if(!user){
          throw error('User not found', 404);
        }

        user.name = name ?? user.name;
        user.roles = roles ?? user.roles;
        user.accountStatus = accountStatus ?? user.accountStatus;

        await user.save();

        return res.status(200).json(user);
      }
      catch(e){
        next(e)
      }

};

const postUserById = async(req, res, next) => {

     const userId = req.params.userId;
     const {name, email, roles, accountStatus} = req.body;

     try{
            const user = await userService.updateUser(userId, {name, email, roles, accountStatus});

            if(!user){
              throw error('User not found', 404);
            }

            return res.status(200).json(user);
     } catch(e){
      next(e)
     }

};






module.exports = {
  getAllUsers,
  getUserById,
  postUser,
  postUserById,
  patchUserById,
  deleteUserById,
}