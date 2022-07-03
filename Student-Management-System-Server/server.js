const express = require('express');
const authenticate = require('./middleware/authenticate');
const routes = require('./routes/index');
const connectDB = require('./db');

const app = express();
app.use(express.json());


/**
 * Auth Router { login, register}
 */
  app.use(routes);
/**
 * Private Route
 */
   app.get('/private', authenticate,  async(req, res) => {
        
     console.log('I am the user', req.user)

        return res.status(200).json({message: 'I am from Private Route'});
   });



   /**
    * Public Route
    */

   app.get('/public', (req, res) => {


    return res.status(200).json({message: 'I am from Public Route'})
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
