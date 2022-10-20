const express = require("express");
const mongoose = require("mongoose");
const authRouter = express.Router();


const userSchema = require("../schemas/userSchema");


/** Create User model */
const User = new mongoose.model("User",userSchema); /** 1st paramter model name, alawys singular it will create table plular like laravel migration */


/** Get all todos  */
authRouter.get('/',async(req,res)=>{
 res.send("this is auth router")
});


module.exports = authRouter