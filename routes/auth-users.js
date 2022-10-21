const express = require("express");
const mongoose = require("mongoose");
const bcryptData = require('bcrypt');
const checkLogin = require("../middlewares/checkLogin");/** checkLogin Middleware */
const jwt = require('jsonwebtoken');
const authRouter = express.Router();
const {Todo} = require("../schemas/todoSchema");
const {User} = require("../schemas/userSchema");


/** Create User model */
// const User = new mongoose.model("User",userSchema); /** 1st paramter model name, alawys singular it will create table plular like laravel migration */

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



/** Login api */
authRouter.post('/login',async(req,res)=>{
  try {
    const user =await User.find({username:req.body.username});
    
    if(user && user.length>0){
        const isValidPassword = await bcryptData.compare(req.body.password,user[0].password);
        
        if(isValidPassword){
          // generate token
          const token = jwt.sign({
            username: user[0].username,
            userId: user[0]._id,
          },process.env.JWT_SECRET, {
            expiresIn: '2 days'
        });

        res.status(200).json({
          success:true,
          api_token :token,
          message:"Login Success",
        })

        }else{
          res.status(401).json({
            error:"Incorrect password or username !",
            success:false
          });
        }
    }
    else{
      res.status(401).json({
        error:"Authentication failed!",
        success:false
      });
    }

  } catch (error) {
    res.status(500).json({
      error:error.message,
      success:false
    });
  }
  
});

/** authentication route */
authRouter.get('/protected-router',checkLogin,(req,res)=>{
    res.send("This is protected router you are authorized");
});

/** Store single todos only authorize user */
authRouter.post('/todo-store',checkLogin,async(req,res)=>{
try {
  const todoModel = new Todo({
    ...req.body,
    user:req.userId
  });

  const todoStore = await todoModel.save();

  /** when todo store user table a todos id save hobe user has many todos hasmany teltion kora jabe aibabe */
  await User.updateOne({
    _id:req.userId
  },{
    $push:{
      todos:todoStore._id
    }  
  })

  res.status(200).json({
    message:"todo created successfully"
})
} catch (error) {
  res.status(500).json({
    error:"there was a serverside error"
});
}

});


/** Get all todos by authorize user */
authRouter.get('/todos/:todo_id',checkLogin,async(req,res)=>{
  try{
      const data = await Todo.find({_id:req.params.todo_id}).populate("user","name username -_id");//ekhane user hosse todo schemate je user seta ata like reltion of laravel second parameter which field we want to show -_id means ata chai na by default alawys id dey mongo

      res.status(200).json({
          data:data,
          message:"Success"
      })
      
  }catch(err){
      res.status(500).json({
          error:"there was a server side error"
      });
  }
  
});


/** Get all users by authorize user */
authRouter.get('/login-user',checkLogin,async(req,res)=>{
  try{
      const user = await User.find({_id:req.userId}).populate("todos","title description -_id");//ekhane todos hosse hasmany reletion

      res.status(200).json({
          data:user,
          message:"Success"
      })
      
  }catch(err){
      res.status(500).json({
          errorMessage:err.message,
          error:"there was a server side error"
      });
  }
  
});

module.exports = authRouter