<<<<<<< HEAD
require("dotenv").config();
const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/custom", (req, res) => {
  res.send("This is a custom route!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
// console.log(process.env);
=======
import mongoose from "mongoose";
import {DB_NAME} from "./Industry_backend/constants.js";


/*
import express from "express"
const app = express()

;(async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
    app.on("error",()=>{
      console.log("ERROR:",error);
      throw error
      
    })

    app.listen(process.env.PORT,()=>{
      console.log(`App is listening on port ${process.env.PORT}`);
      
    })
  } catch (error) {
    console.error("ERROR: ",error)
    throw err
  }
  
})
*/
>>>>>>> e31c4ed (Postman and debugging)
