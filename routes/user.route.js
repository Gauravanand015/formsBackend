const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user.model');
const userRoute = express.Router()



// User registration
userRoute.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({ username, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
  });

// User login
userRoute.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ username:username });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
  
      // Generate and send a JSON Web Token (JWT) for authentication
      const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
      res.json({ message: 'Login successful.', token });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'An error occurred while logging in.' });
    }
  });
  
module.exports = {
    userRoute
}