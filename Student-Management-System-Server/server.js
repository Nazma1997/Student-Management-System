const express = require('express');
const  bcrypt = require('bcryptjs');
const connectDB = require('./db');
const User = require('./models/User');
const app = express();
app.use(express.json());


/**
 * Register a User
 */
app.post('/register', async(req, res, next) => {
   try{
    const {name, email, password} = req.body;
    if(!name || !email || !password){
      return res.status(400).json({message: 'Invalid Data'})
    }
    let user = await User.findOne({email});
    if(user){
      return res.status(400).json({message: "User Already Exist"});
    }

    user = new User({name, email, password});
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;

    await user.save();

    return res.status(201).json({message: 'User Created Successfully', user})

    
   }catch(e){
    next(e)
   }
});

/**
 * Login a User
 */

app.post('/login', async(req, res) => {


  const {email, password} = req.body;
    
  try{
    
      const user= await User.findOne({email});

      if(!user){
        return res.status(400).json({message: 'Invalid Credential'});
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
        return res.status(400).json({message: 'Invalid Credential'});
      }

      delete user._doc.password;
      return res.status(200).json({message: 'Login Successfully', user});
  }catch(e){
    next(e);
  }
})

/**
 * Global Error Handler
 */
   app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({message: 'Server Error Occurred'})
   })


/**
 * Connect With MongoDb
 */
connectDB('mongodb://localhost:27017/attendance-db')
.then(() => {
  console.log('DataBase is Connected')
  app.listen(5000, () => {
    console.log('Server is Listening on port 5000');
})
})
.catch(error => {
     console.log(error)
})
