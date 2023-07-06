const mongoose = require('mongoose');
mongoose.set('strictQuery' , false);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);

            console.log(`Connect to DB ${conn.connection.host}`)
        
    } catch (error) {
        console.log('Cannot connect to db');
    }
}

module.exports = connectDB;