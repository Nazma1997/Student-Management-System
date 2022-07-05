const User = require('../models/User');



const findUserByProperty = (key, value) => {
  if(key === '_id'){
    return User.findById(value);
  }

  return User.findOne({[key] : value});
};


const createNewUser = ({name, email, password}) => {
  const user = new User({name, email, password});
  return user.save();
}
 /**
  * Find Users
  */

 const findUsers = () => {
  return User.find();
 }

module.exports = {
  findUserByProperty,
  createNewUser,
  findUsers,
}