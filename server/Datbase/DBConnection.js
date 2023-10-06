import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const userName = process.env.USERN;
const userPass = process.env.USERPASS;
const dataBase = process.env.DBNAME;

const DBConnection = async() => {
    const API_URL = `mongodb+srv://${userName}:${userPass}@ecommerce.24sdehn.mongodb.net/${dataBase}?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(API_URL,{useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Database Connected Succesfully");
    } catch (error) {
        console.log("Error while Connecting"+ error);
    }
}

export default DBConnection;