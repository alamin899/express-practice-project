var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("this is index");
});

router.get('/users/:id', function(req, res, next) {
  res.send(`this is from index route ${req.params.id}`);
});

/** res.render() if request accept type html then it will rturn html file  */
router.get('/about/page', function(req, res, next) {
  res.render("pages/about",{
    name:(req.body.name)?req.body.name:"alamin",
    email:(req.body.email)?req.body.name:"alamin@appanp.io",
    phone:(req.body.phone)?req.body.name:"01758845299",
    country:(req.body.country)?req.body.name:"Bangladesh"
  });
});

/** res.json() if request accept type json then it will response json data */
router.get('/about/json', function(req, res, next) {
  let response = {
    success:true,
    status:200,
    data:{
      name:(req.body.name)?req.body.name:"alamin",
      email:(req.body.email)?req.body.name:"alamin@appanp.io",
      phone:(req.body.phone)?req.body.name:"01758845299",
      country:(req.body.country)?req.body.name:"Bangladesh"
    }
  }

  res.json(response);
});

/** res.status() its set status code */
router.get('/about/status', function(req, res, next) {
  res.status(200);

  let response = {
    success:true,
    status:res.statusCode,
    data:{
      name:(req.body.name)?req.body.name:"alamin",
      email:(req.body.email)?req.body.name:"alamin@appanp.io",
      phone:(req.body.phone)?req.body.name:"01758845299",
      country:(req.body.country)?req.body.name:"Bangladesh"
    }
  }

  res.json(response);
});


/** res.format() check req header"s accept then which match those section will fire*/
router.get('/about/format', function(req, res, next) {
 let data = {
    name:(req.body.name)?req.body.name:"alamin",
    email:(req.body.email)?req.body.name:"alamin@appanp.io",
    phone:(req.body.phone)?req.body.name:"01758845299",
    country:(req.body.country)?req.body.name:"Bangladesh"
  };

  let response = {
    success:true,
    status:res.statusCode,
    data: data
  }

  res.format({
    'text/plain' : ()=>{
      res.send("this is text/plain")
    },
    'text/html' : ()=>{
      res.render("pages/about",data);
    },
    'application/json' : ()=>{
      res.json(response);
    },
    default:()=>{
      res.status(406).send("not acceptable");
    }
  });
});

/** res.cookie() its set cookie */
router.get('/about/cookie', function(req, res, next) {
  res.cookie("test-cookie1","this is test cookie1"); //set cookie to browser
  
  res.clearCookie("test-cookie"); //remove cookie from browser
  
  res.send("cookie set completed");
});

/** res.redirect() its redirect to another url */
router.get('/about/redirect', function(req, res, next) {
  res.redirect("/about/page")
  res.end();
});

/** res.set() it set header custom or present type modify  and res.get() its show namewise header value */
router.get('/about/get-set', function(req, res, next) {
  res.set("alamin","This is alamin from tangail")

  console.log(res.get("alamin"))

  res.send("getting using set and get from response header");
});


module.exports = router;
