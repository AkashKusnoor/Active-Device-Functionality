const express = require('express');
const sessionService = require('../services/sessionService');

const sessionModels = require("../models/sessionModels");
 

 
const activeSessions = async (req, res) => {
  try {
    const sessions = await sessionModels.find({ userId: req.user.userId, isActive: true });
    console.log('req.user',req.user)
    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching active sessions' });
  }     
} 

// Logout User from Specific Device 
const logoutFromDevice = async (req, res) => {
  try {
    const { sessionId } = req.params; 
    const userId = req.user.userId;
  
  
    // Delete the session associated with the specified session ID
   await sessionModels.findByIdAndDelete({_id:sessionId,userId:req.user._id})

    // Mark the session as inactive
    await sessionModels.findByIdAndUpdate(sessionId, { isActive: false });

    res.json({ message: 'Logout from device successful' });
  } catch (error) {
     console.error(error);
    res.status(500).json({ message: 'Error logging out from device' });
  }
};
 

// Logout User from All Devices
const logoutFromAllDevices = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming you have access to the user's ID from authentication middleware

    // Delete all sessions associated with the user from the database                                                                                                                         
    await sessionModels.deleteMany({ userId });

    res.json({ message: 'Logout from all devices successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging out from all devices' });
  }
};

module.exports = { activeSessions ,logoutFromDevice , logoutFromAllDevices};
  