const {loginService, registerService} = require('../service/auth');

const loginController =  async(req, res, next) => {


  const {email, password} = req.body;
    
  try{
    const token = await loginService({email, password});

      return res.status(200).json({message: 'Login Successfully', token});
  }
  catch(e){
    next(e);
  }
};


const registerController =  async(req, res, next) => {

  try{
       const {name, email, password} = req.body;
  if(!name || !email || !password){
    return res.status(400).json({message: 'Invalid Data'})
  }
    const user = await registerService({name, email, password})
    return res.status(201).json({message: 'User Created Successfully', user})

   
  }catch(e){
   next(e)
  }
};


module.exports= {
  loginController,
  registerController
}