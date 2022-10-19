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
        // enum:["active","inactive"]
    },
    created_at:{
        type:Date,
        default:Date.now
    }

});

/** make instance or scope(laravel) */
mongoose.methods ={
    findInActive:function(){
        return mongoose.model("Todo").find({status:"inactive"});
    }
}

module.exports = todoSchema