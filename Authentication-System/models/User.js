const {model, Schema} = require('mongoose');


const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength : 10
  },
  email: {
    type: String,
    required: true,
    validate:{
      validator: function(v){
         return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(v);

      }
    }
  },
  password: {
    type: String,
    minlength: [4, 'Password is too short'],
   
    required: true
  },
  roles: {
    type: [String],
    default: ['Student'],
    required: true
  },
  accountStatus: {
    type: String,
    enum: ['Pending', 'Active', 'Rejected'],
    default: 'Pending',
    required: true
  }
})

const User = model('User', userSchema);

module.exports = User;