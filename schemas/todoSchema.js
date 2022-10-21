const express = require('express');
const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    status:{
        type:String,
        enum:["active","inactive"]
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    user:{  //this is user reletion foreign
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }

});

/**model create */
/** Create Todo mode */
const Todo = new mongoose.model("Todo",todoSchema); /** 1st paramter model name, alawys singular it will create table plular like laravel migration */


/** make instance or scope(laravel) */
todoSchema.methods ={
    findInActive:function(){
        return mongoose.model("Todo").find({status:"inactive"});
    },
    findActive:function(cb){
        return mongoose.model("Todo").find({status:"active"},cb);
    }
}


/** mongo static method its like (laravel scope) */
todoSchema.statics ={
    findActiveData:function(){
        return this.find({status:"active"}); //jehetu static ai classer ri instance so this diye amra paye jabo
    }
}

/** mongo static method its like (laravel scope) */
todoSchema.query ={
    getDataByStatus:function(status){
        return this.find({status:status}); //jehetu static ai classer ri instance so this diye amra paye jabo
    }
}

module.exports = {
    todoSchema:todoSchema,
    Todo:Todo
}