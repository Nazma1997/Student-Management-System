const {model, Schema} = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 10
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(v){
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(v);
      },
      message: (prop) =>  `Invalid email : ${prop.value}`,
    }
  },
  password: {
    type: String,
    minlength: [6, 'Password is too Short'],
    required: true
  },
  roles: {
    type: [String],
    required: true,
    default: ['STUDENT']
  },
  accountStatus: {
    type: String,
    enum: ['PENDING', 'ACTIVE', 'REJECTED'],
    default: 'PENDING'
  }
});


const User = model('User', userSchema);
module.exports = User;