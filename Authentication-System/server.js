const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectDB = require('./db');
const User = require('./models/User');
const app = express();
app.use(express.json());




app.get('/', (_req, res) => {
  const obj = {
    name:'Tanbir',
    email: 'tanbir@gmail.com'
  };
  
  res.json(obj);
});

app.post('/register', async(req, res, next) => {
  
  const {name, email, password, accountStatus} = req.body;

  if(!name || !email || !password){
    return res.status(400).json({message: "Invalid Data"});

  }

  try{
    let user = await User.findOne({email})
    if(user){
        return res.status(400).json({message: "User already exist"})
    }
    user = new User({name, email, password,accountStatus})
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
 
    user.password = hash
    await user.save();
 
    return res.status(201).json({message : "User created successfully", user})
  } catch (e){
       next(e)
  }
});

app.post('/login',async(req,res, next) => {
       
      const {email, password} = req.body;
      try{ 
        const user = await User.findOne({email})

        if(!user){
          return res.status(400).json({message: 'Invalid Credential'})
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
          return res.status(400).json({message: 'Invalid Credential'})
        }
         delete user._doc.password;


         const token = jwt.sign(user._doc, 'secret-key', {expiresIn: '2h'})
        return res.status(200).json({message: 'Login Successfully', token})
      }
      catch(e){
        next(e)
      }
})

app.get('/private', (req, res) => {
     
    let token = req.headers.authorization;
    if(!token){
      return res.status(401).json({message: 'Unauthorized'})
    }

    try{
       
      token = token.split('')[1];
      const user = jwt.verify(token, 'secret-key');
      console.log(user)
    }catch (e){
        return res.status(400).json({message: 'Invalid Token'})
    }

    return res.status(200).json({message: 'I am private Route'})
})

app.get('/public', (req, res) => {
  return res.status(200).json({message: 'I am Public Route'})
})


app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({message: 'Server Error Occurred'})
})

connectDB('mongodb://localhost:27017/attendance-db')
.then(() => {
  console.log('Database is connected')
  app.listen(5000, () => {
    console.log('Server is listing on port 5000')
  });
})
.catch((error) => {
  console.log(error)
})

