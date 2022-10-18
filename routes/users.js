var express = require('express');
let app = express();
var router = express.Router();
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

// Cookie Parser
app.use(cookieParser())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.dir(`${req.ip} is body`);
  res.send('respond with a resource by users');
});

router.get('/account/:id',(req,res)=>{
  if(req.query.mobile){
    console.log(req.query)
    res.send(`From User`)
  }

  if(req.query.email){
    console.log(req.query)
    res.send(`there is email query parameter`)
  }

  console.log("no query present");

  res.send(`this is account by user`)
})

/* POST users. */
router.post('/', function(req, res) {
  console.log(req.secure);
  res.send('respond body users');
});

module.exports = router;
