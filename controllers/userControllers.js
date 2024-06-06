const express = require('express');
const bcrypt = require('bcrypt'); // For password hashing
const JWT = require('jsonwebtoken'); // For token generation
const userModel = require('../models/userModel');
const { hashPassword, comparePassword } = require('../helpers/authHelpers');
const sessionModels = require('../models/sessionModels');


 
const secret = process.env.JWT_SECRET; // Store secret securely (e.g., environment variable)
 
// User Registration
const registerUser =  async (req, res) => {
  const { username, password } = req.body;   
  
 
  // Input validation (optional, but recommended)
  if (!username || !password) {
    return res.status(400).json({ message: 'Missing username or password' });
  }
  
  try {
    // Check for existing user
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }
 

    const hashedPassword = await hashPassword(password); 
 
    //Create new user
    const newUser = new userModel({ username, password: hashedPassword });
    await newUser.save(); 
 
    // // Generate JWT token
    // const token = jwt.sign({ userId: newUser._id }, secret, { expiresIn: '1h' });
 
    res.status(201).json({ message: 'User created successfully',  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
};
 
// User Login
const loginUser = async (req, res) => {
  const { username, password , deviceId  } = req.body;
 
  if (!username || !password) {
    return res.status(400).json({ message: 'Missing username or password' });
  }
  
  try {
    const user = await userModel.findOne({ username });
    console.log(user)
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
 
   //Compare password hashes
   const match = await comparePassword(password, user.password)
   if(!match){
       res.status(200).send({
           success:false,
           message:'Invalid Password'
       })
   }

 
  // Generate JWT token
    const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' });

    const session = new sessionModels({
      userId: user._id,
      deviceId: req.body.deviceId,
     // deviceType: req.body.deviceType,
     // location: req.body.location,
     // ipAddress: req.ip
    });

    await session.save()
 
    res.json({ message: 'Login successful', token, session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
};
 



module.exports = {registerUser, loginUser}

