const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors'); 


const app = express();
const secretKey = 'your-secret-key';

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://admin:admin@cluster0.xdg5g1e.mongodb.net/?retryWrites=true&w=majority')
.then(()=> console.log("Db connected sucessfully!"))
.catch((e)=> console.log(e));

const userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    username: { type: String, unique: true, required: true },
    password: String,
    secret: String,
  });
  
  const User = mongoose.model('User', userSchema);

  function verifyToken(req, res, next) {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. Token is missing' });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
  
      req.user = decoded;
      next();
    });
  }
  
  
  app.post('/register', async (req, res) => {
    const { username, password, firstName, lastName } = req.body;
  
    try {

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      const newUser = new User({
        firstName,
        lastName,
        username,
        password,
        secret: "you haven't posted any secret, yet...",
      });
  

      await newUser.save();
  

      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
      console.log(token)
      return res.json({ message: 'Signup successful', token });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

 
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      
      const user = await User.findOne({ username });
  
     
      if (user && user.password === password) {
        
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  
        return res.json({ message: 'Login successful', token });
      }
  
      res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
      console.error(error);
    }
  });

 
app.get('/all-secrets', verifyToken, async (req, res) => {
  try {
   
    const allUsers = await User.find({});

    res.json({ allUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/set-secret', verifyToken ,  async (req, res) => {
  const { secret } = req.body;
  const { username } = req.body;

  try {
 
    const user = await User.findOne({ username });
    console.log(user)
   
    user.secret = secret;

    
    await user.save();

    res.json({ message: 'Secret set successfully', secret: user.secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

  

app.get('/current-user', verifyToken ,  async (req, res) => {
  try {
    const currentUser = await User.findOne({ username: req.query.username});

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      username: currentUser.username,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/reset-password' ,  async (req, res) => {
  const { username, password } = req.body;
  try {

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = password;
    await user.save();
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    res.json({ message: 'Password reset successfully',token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});