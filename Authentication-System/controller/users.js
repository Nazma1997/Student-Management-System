const User = require('../models/User');
const userService = require('../service/user');
const error = require('../utils/customError');
const authService = require('../service/auth')

const getUsers = async(req, res, next) => {

  try{
      const users = await userService.findUsers();
      return res.status(200).json(users)
  }
  catch(e){
    next(e)
  }
};


const getUserById = async(req, res, next) => {

  const userId = req.params.userId;

  try{
     
     const user = await userService.findUserByProperty('_id', userId);

     if(!user){
      return error('User Not Found', 404);
      
     }

     return res.status(200).json(user)
  } catch (e) {
    next(e)
  }

};

const postUser = async(req, res, next) => {
  const {name, email, password, roles, accountStatus} = req.body;
  try{
    
    const user = await authService.registerService({name, email, password, roles, accountStatus});
      
    return res.status(201).json(user)
  }catch (e) {
    next(e)
  }
};

const postUserById = (req, res, next) => {};

const patchUserById = (req, res, next) => {};

const deleteUserById = (req, res, next) => {};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  postUserById,
  patchUserById,
  deleteUserById
}