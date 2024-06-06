const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For password hashing
 
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Other user fields (e.g., email, name)
}); 
 

 
module.exports = mongoose.model('User', userSchema);    


