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


mongoose.connect('mongodb+srv://admin:admin@cluster0.xdg5g1e.mongodb.net/?retryWrites=true&w=majority').then(()=> console.log("Db connected sucessfully!")).catch((e)=> console.log(e));

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
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Create a new user
      const newUser = new User({
        firstName,
        lastName,
        username,
        password,
        secret: "you haven't posted any secret, yet...",
      });
  
      // Save the user to the database
      await newUser.save();
  
      // Create a JWT token
      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  
      res.json({ message: 'User registered successfully', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // User Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user by username
      const user = await User.findOne({ username });
  
      // Check if the user exists and the password is correct
      if (user && user.password === password) {
        // Create a JWT token
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  
        return res.json({ message: 'Login successful', token });
      }
  
      res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
      console.error(error);
    }
  });

  // Get all secrets for all users
app.get('/all-secrets', async (req, res) => {
  try {
    // Find all users and retrieve their secrets
    const allUsers = await User.find({})
    ;

    res.json({ allUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/set-secret', async (req, res) => {
  const { secret } = req.body;
  const { username } = req.body;

  try {
    // Find the authenticated user
    const user = await User.findOne({ username });
    console.log(user)
    // If the user already has a secret, update it; otherwise, create a new one
    user.secret = secret;

    // Save the updated user to the database
    await user.save();

    res.json({ message: 'Secret set successfully', secret: user.secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

  

  app.get("/test" , (req,res)=>{
    return res.status(200).json({message:"Working!!"})
  })


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});