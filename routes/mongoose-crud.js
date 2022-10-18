const express = require("express");
const mongoCrudRoter = express.Router();
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema");


/** Create Todo mode */
const Todo = new mongoose.model("Todo",todoSchema); /** 1st paramter model name alawys singular it will create table plular like laravel migration */

/** Get all todos */
mongoCrudRoter.get('/',async(req,res)=>{

});

/** Find single todos */
mongoCrudRoter.get('/:todo_id',async(req,res)=>{

});

/** Store single todos */
mongoCrudRoter.post('/',async(req,res)=>{

});

/** Store multiple todos */
mongoCrudRoter.post('/multiple',async(req,res)=>{

});

/** Update multiple todos */
mongoCrudRoter.put('/:todo_id',async(req,res)=>{

});


/** Update multiple todos */
mongoCrudRoter.put('/multiple/:todo_id',async(req,res)=>{

});


module.exports = mongoCrudRoter;