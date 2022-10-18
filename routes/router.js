var express = require('express');
var routes = express.Router();

/** this is our middleware function */
 const logger = (req,res,next)=>{
    console.log(`${new Date().toLocaleString()}--- ${req.method} --- ${req.originalUrl} --- ${req.protocol} --- ${req.ip}`)
    next()
   }

   //routes.all('*',logger); /** we can call our middleware this way */

   routes.use(logger);  /** we can call our middleware this way also */

   routes.get('/',(req,res,next)=>{
    console.log("this is router tutorial practice");
    res.send("this is router tutorial practice");
   })

   /** we can make resource route by route method */

   routes.route('/user')
   .all((req,res,next)=>{
        console.log("this is log middleware which is all route under user will log");
        next()
    })
   .get((req,res,next)=>{
        res.send("this is get method");
    })
   .post((req,res,next)=>{
        res.send("this is post method");
    })
   .put((req,res,next)=>{
        res.send("this is put method");
    })
    .delete((req,res,next)=>{
        res.send("this is delete method");
    })

   module.exports = routes;
   