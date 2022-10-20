const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        enum:[1,0],
        default:0
    },
    created_at:{
        type:Date,
        default:Date.now
    }

});

module.exports = userSchema