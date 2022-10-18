var express = require('express');
var router = express.Router();

/** this is middleware */
  // const logger = (req,res,next)=>{
  //   console.log(`${new Date().toLocaleString()}--- ${req.method} --- ${req.originalUrl} --- ${req.protocol} --- ${req.ip}`)
  //   if(req.params.id == 1) next();
  //   res.redirect('/middleware/not-authenticate')
  //  }
  //  router.use(logger)

   /** end middleware */

  router.get('/', function(req, res, next) {
    res.send(`this is middleware route`);
  });

  router.get('/error-handling/:id', function(req, res, next) {
    if(req.params.id == 1) res.send("Success");
    else  throw new Error("this is error exception from throw error");  //when we through exception we should create error middleware where this error will generate here its in app.js file
  });
  
module.exports = router;