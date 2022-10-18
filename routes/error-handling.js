var express = require('express')
var errorRoute = express.Router()

/** synchronise error handling */
errorRoute.get('/',(req,res,next)=>{
    console.log(a); // this will error throw becuse synchronise by default error handled
    res.send("this is error handling index route")
})

/** asynchronise error handling */

/** In asynchronise route we have to try catch for handling error message .because asynchronise by default do not catch error handle */
errorRoute.get('/async',(req,res,next)=>{
    setTimeout(function(){
        try{
            console.log(a)
        }catch(error){
            next(error)
        }
    })
})


/** if we want to catch 404 error then we should make simple middleware in middleware we call next in next(this is error) we will pass data this next 
 * method understand that its need error handing middleware. we know next method er bitore kono data pele seti error handing middleware call kore
*/

errorRoute.use((req,res,next)=>{
    next("Requested url was not found!");
})

/** all serverside error handling middleware */
errorRoute.use((err,req,res,next)=>{
    if(err.message) res.status(500).send(err.message);
    else res.status(500).send("There was an serverside error !")
})

module.exports = errorRoute;