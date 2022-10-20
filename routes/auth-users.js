const express = require("express");
const mongoose = require("mongoose");
const bcryptData = require('bcrypt');
const authRouter = express.Router();


const userSchema = require("../schemas/userSchema");


/** Create User model */
const User = new mongoose.model("User",userSchema); /** 1st paramter model name, alawys singular it will create table plular like laravel migration */

/** signup api */
authRouter.post('/signup',async(req,res)=>{
  try {
    const hashPassword = await bcryptData.hash(req.body.password,10);

    const user = new User({
      name:req.body.name,
      username:req.body.username,
      password:hashPassword,
      status:req.body.status || 0,
    });

    await user.save();

    res.status(200).json({
      message:"user successfully registered",
      success:true
    })

  } catch (error) {
    res.status(500).json({
      error:error.message,
      success:false
    });
  }
  
});


module.exports = authRouter