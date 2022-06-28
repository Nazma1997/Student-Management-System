const express = require('express');

const connectDB = require('./db');
const authenticate = require('./middleware/authentication')
const routes = require('./routes/index');

const app = express();
app.use(express.json());
app.use(routes)



app.get('/', (_req, res) => {
  const obj = {
    name:'Tanbir',
    email: 'tanbir@gmail.com'
  };
  
  res.json(obj);
});


app.get('/private', authenticate,  async(req, res) => {
    return res.status(200).json({message: 'I am private Route'}) 
})

app.get('/public', (req, res) => {
  return res.status(200).json({message: 'I am Public Route'})
})


app.use((err, req, res, next) => {
  
  const message = err.message ? err.message : 'Server Error Occurred';
  const status = err.status ? err.status : 500;

  res.status(status).json({message})
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

