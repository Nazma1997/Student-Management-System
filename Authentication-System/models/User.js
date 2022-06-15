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
  password: String,
  roles: [String],
  accountStatus: String
})

const User = model('User', userSchema);

module.exports = User;