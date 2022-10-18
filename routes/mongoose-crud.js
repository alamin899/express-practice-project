const express = require("express");
const mongoCrudRoter = express.Router();

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