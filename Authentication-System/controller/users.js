const User = require('../models/User');
const userService = require('../service/user');

const getUsers = async(req, res, next) => {

  try{
      const users = await userService.findUsers();
      return res.status(200).json(users)
  }
  catch(e){
    next(e)
  }
};


const getUserById = (req, res, next) => {};

const postUser = (req, res, next) => {};

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