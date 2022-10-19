const express = require("express");
const mongoCrudRoter = express.Router();
const mongoInstanceRoter = express.Router();
const mongoStaticRoter = express.Router();
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema");


/** Create Todo mode */
const Todo = new mongoose.model("Todo",todoSchema); /** 1st paramter model name, alawys singular it will create table plular like laravel migration */


/** Get all todos  */
mongoCrudRoter.get('/',async(req,res)=>{
    /** we can use try catch */
    try{
        const data = await Todo.find();

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


/** Get selected todos data  */
mongoCrudRoter.get('/specific',(req,res)=>{
    Todo.find({status:"active"}).select({  /** eibabe specific data pete pari chining er maddome */
        _id:0,
        __v:0
    }).exec((err,data)=>{  /** jehetu ekhane callback sehetu amader async and await use kora lagbe na */
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
    try{
        const data = await Todo.find({_id:req.params.todo_id});

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

/** delete todo by status*/
mongoCrudRoter.delete('/:todo_id',async(req,res)=>{
    await Todo.deleteOne({
        _id:req.params.todo_id
    },(err)=>{
        if(err){
            res.status(500).json({
                error:"There was a server side error"
            });
        }
        else{
            res.status(200).json({
                message:"Todo deleted successfully"
            })
        }
    })
});




/**===================================Start Mongoose Instance method================================================================= */


/**============Step of Mongoose method===========
 * 1.create a schema form mongoose.Schema
 * 2.create a model (which is an another class) form mongoose.model class and pass schema to it
 * 3.create a document using model class
 * 4.call necessary model instance method using document
   const todoSchema = new mongoose.Schema({title:String});
   const Todo = new mongoose.model('ModelName',todoSchema);
   const todo = new Todo({title:"this is title"});
   todo.save() 
   */


   /** custom instance method ,instance method like laravel scope
    * this is (async & await) way
   */
    mongoInstanceRoter.get('/inactive-data',async(req,res)=>{
        try{
            const todo = new Todo();

            const data = await todo.findInActive();

            res.status(200).json({
                data:data,
                message:"Here is all inactive todo list"
            })
            
        }catch(err){
            res.status(500).json({
                allError:err.message,
                error:"there was a server side error"
            });
        }
    });


    /** this is Callback way */
    mongoInstanceRoter.get('/active-data',(req,res)=>{
        const todo = new Todo();

        todo.findActive((err,data)=>{
            if(err){
                res.status(500).json({
                    allError:err.message,
                    error:"there was a server side error"
                });
            }
            else{
                res.status(200).json({
                    data:data,
                    message:"Here is all active todo list"
                })
            }
        });
    });



/**===================================Start Mongoose Static method================================================================= */
mongoStaticRoter.get('/active-data',async(req,res)=>{
    try{
        const data = await Todo.findActiveData();

        res.status(200).json({
            data:data,
            message:"Here is all active todo list"
        })
        
    }catch(err){
        res.status(500).json({
            allError:err.message,
            error:"there was a server side error"
        });
    }
});

module.exports = {
    mongoCrudRoter:mongoCrudRoter,
    mongoInstanceRoter:mongoInstanceRoter,
    mongoStaticRoter:mongoStaticRoter,
};