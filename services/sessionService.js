

const sessionModels = require('../models/sessionModels');
        
const updateSession = async (userId, ipAddress) => {
  const existingSession = await Session.findOne({ userId });
  if (existingSession) {
    existingSession.lastActivity = Date.now();
    existingSession.ipAddress = ipAddress;
    await existingSession.save();
  } else {
    const newSession = new Session({ userId, deviceId: 'unknown', deviceType: 'unknown', ipAddress });
    await newSession.save();
  }       
};
 
const logoutSession = async (sessionId) => {
  await sessionModels.findByIdAndUpdate(sessionId, { isActive: false });  
};

 
// const logoutAllSessions = async (userId, currentSessionId) => {
//   await sessionModels.updateMany({ userId, _id: { $ne: currentSessionId } }, { isActive: false });
// };
const logoutAllSessions = async (userId, currentSessionId) => {
  try {
    // Deactivate all sessions except the current one
    await sessionModels.updateMany({ userId, _id: { $ne: currentSessionId }, isActive: true }, { isActive: false });
     // Remove inactive sessions entirely
     await sessionModels.deleteMany({ userId, isActive: false });
  } catch (error) {
    throw new Error('Error logging out all sessions');
  }
};
 
module.exports = {  updateSession, logoutSession, logoutAllSessions };      
