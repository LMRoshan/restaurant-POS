import mongoose from 'mongoose';
const dbURL = 'mongodb://127.0.0.1:27017/pos-project';

const connectDB = () => {
    mongoose.connect(dbURL
    ).then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
}

export default connectDB;