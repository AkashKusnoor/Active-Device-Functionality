const mongoose = require('mongoose')

const connectDB = async (req,res)=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected`);
    } catch (error) {
        console.log(`MONGODB connection error ${error}`)
    }
}

module.exports = connectDB;





