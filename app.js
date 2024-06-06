const express = require ('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const cors = require ('cors');
const morgan = require('morgan');
const os=require('os')


const userRoutes = require('./routes/userRoutes')
const sessionRoutes = require('./routes/sessionRoutes');
const connectDB = require('./db/db');



dotenv.config();

const app = express();



//port
const PORT = process.env.PORT || 6000

connectDB();

//middleware
app.use(express.json());
app.use(cors())
app.use(morgan("dev"))

//routes
app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/", sessionRoutes)


function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();
 
    for (const interfaceName of Object.keys(interfaces)) {
        const networkInterface = interfaces[interfaceName];
 
        for (const iface of networkInterface) {
            if (!iface.internal && iface.family === 'IPv4') {
                return iface.address;
            }
        }
    }
 
    return 'localhost'; // Default to localhost if no suitable address is found
}
 
const localIp = getLocalIpAddress();
console.log(localIp)
 
app.get("/localip",(req,resp)=>{
    try{
        resp.json({message:'localIpfected',localIp:localIp})
    }
    catch(error){
        resp.json({message:'error in ip'})
    }
})






app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})



