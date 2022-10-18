var express = require('express');
var adminRouter = express.Router();


/* GET users listing. */
adminRouter.get('/users/account/:1', function(req, res, next) {
  console.dir(`${req.ip} is body`);
  res.send('From Admin');
});

adminRouter.get('/account/:id',(req,res)=>{
  console.log(req.query)
  res.send(`From Admin`)
})

module.exports = adminRouter;
