const express = require ("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

//app.get("/",(req,res)=>res.send("Hello World"));

//define running port
const PORT = process.env.PORT ||3030;

app.use(cors());
app.use(bodyParser.json());

//get DB URL 
const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useNewUrlParser:true
});
const connection = mongoose.connection;

//open DB connection
connection.once("open", () =>{
    console.log("MongoDB connection is success!");
})

const recipeRouter= require("./routes/recipeRoute.js");

//http://localhost:3030/recipe

app.use("/recipe", recipeRouter);

app.listen(PORT,()=>{
    console.log("Server is up and running on PORT ${PORT}")
});