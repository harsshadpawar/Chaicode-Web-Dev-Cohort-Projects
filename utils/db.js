import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//const mongoose = require("mongoose");

//export a function that connects to db

const db = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Conected to MongoDB");
    })
    .catch((err) => {
      console.log("Error Connecting DB.");
    });
};

export default db;
