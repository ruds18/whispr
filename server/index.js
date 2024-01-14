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
    username: { type: String, unique: true },
    password: String,
  });
  
  const User = mongoose.model('User', userSchema);
  
  // User Registration
  app.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Create a new user
      const newUser = new User({ username, password });
      
      // Save the user to the database
      await newUser.save();
  
      // Create a JWT token
      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  
      res.json({ message: 'User registered successfully', token });
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
        // Duplicate key error, indicating that the username is not unique
        return res.status(400).json({ message: 'Username already exists' });
      }
  
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
  

  app.get("/test" , (req,res)=>{
    return res.status(200).json({message:"Working!!"})
  })


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});