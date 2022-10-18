const express = require("express");
const mongoCrudRoter = express.Router();
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema");


/** Create Todo mode */
const Todo = new mongoose.model("Todo",todoSchema); /** 1st paramter model name, alawys singular it will create table plular like laravel migration */


/** Get all todos  */
mongoCrudRoter.get('/',async(req,res)=>{
    await Todo.find({},(err,data)=>{
        if(err){
            res.status(500).json({
                error:"there was a server side error"
            });
        }
        else{
            res.status(200).json({
                data:data,
                message:"Success"
            })
        }
    })
});


/** Get selected todos data  */
mongoCrudRoter.get('/specific',async(req,res)=>{
    await Todo.find({status:"active"}).select({  /** eibabe specific data pete pari chining er maddome */
        _id:0,
        __v:0
    }).exec((err,data)=>{
        if(err){
            res.status(500).json({
                error:"there was a server side error"
            });
        }
        else{
            res.status(200).json({
                data:data,
                message:"Success"
            })
        }
    })
});


/** Find single todos */
mongoCrudRoter.get('/:todo_id',async(req,res)=>{

});


/** Store single todos */
mongoCrudRoter.post('/',async(req,res)=>{
    const todoModel = new Todo(req.body);
    // await Todo.create(req.body,(err)=>{
    await todoModel.save((err)=>{ 
        if(err){
            res.status(500).json({
                error:"there was a serverside error"
            });
        }
        else{
            res.status(200).json({
                message:"todo created successfully"
            })
        }
    })
});


/** Store multiple todos */
mongoCrudRoter.post('/multiple',async(req,res)=>{
    // const todoModel = new Todo(req.body); //req.body should be array object
    await Todo.insertMany(req.body,(err)=>{
        if(err){
            res.status(500).json({
                error:"there was a server side error"
            });
        }
        else{
            res.status(200).json({
                message:"multiple todo created successfully"
            })
        }
    })
});



/** Update single todos */
mongoCrudRoter.put('/:todo_id',async(req,res)=>{
    /** we can use Todo.findByIdAndUpdate() eibabe amra await ke jodi variable a nei tahole update er por data dibe*/
    await Todo.updateOne({
        _id:req.params.todo_id
    },{
        $set:{
            title:req.body.title,
            description:req.body.description,
            status:req.body.status,
        }
    },(err)=>{
        if(err){
            res.status(500).json({
                error:"there was a server side error"
            });
        }
        else{
            res.status(200).json({
                message:"Todo updated successfully"
            })
        }
    })
});



/** Update multiple todos by status*/
mongoCrudRoter.put('/multiple/:status',async(req,res)=>{
    await Todo.updateMany({
        status:req.params.status
    },{
        $set:{
            status:"active",
        }
    },(err)=>{
        if(err){
            res.status(500).json({
                error:"there was a server side error"
            });
        }
        else{
            res.status(200).json({
                message:"Multiple todo updated successfully"
            })
        }
    })
});


module.exports = mongoCrudRoter;