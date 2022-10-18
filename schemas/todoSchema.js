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

module.exports = todoSchema