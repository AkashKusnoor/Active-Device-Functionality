const JWT = require('jsonwebtoken');

const requireSignIn = async (req,res,next)=>{
  try {
     const decoded = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
     req.user = decoded;
     console.log(decoded)
     next();
 } catch(error){
   console.log(error)
    // Send error response to the client
    return res.status(401).json({ message: 'Unauthorized' });
          }

}     

module.exports = requireSignIn;