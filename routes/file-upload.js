const express = require('express')
const fileUploadRouter = express.Router();
const multer = require('multer');
const path = require('path');


/** File upload folder */
const FILE_UPLOAD_FOLDER = "./uploads";


/**============================= storage configure with custom filename ======================================*/
const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,FILE_UPLOAD_FOLDER);
  },
  filename:(req,file,cb)=>{
    const fileExtenction = path.extname(file.originalname);
    const fileName = file.originalname
                          .replace(fileExtenction,"")
                          .toLocaleLowerCase()
                          .split(" ")
                          .join("-")+"-"+Date.now();

    cb(null,fileName+fileExtenction);  //cb hosse callback cb(1st,secont) cb 1st param means error and second means true and take data also
  }
});


/**=========================Prepare the final multer upload object============================== */
var upload = multer({
    storage:storage,
    limits:{
      fileSize:1000000, //1 mb file validation
    },
    fileFilter:(req,file,cb)=>{
      //console.log(file)  // this give us fieldname: 'image1',originalname: 'Screenshot from 2022-09-12 20-37-18.png',encoding: '7bit', mimetype: 'image/png'
      if(file.filename == "image1"){
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
          cb(null,true) //cb hosse callback first param hosse error nibe second true false nibe then true hole next kaj korbe
        }
        else{
          cb(new Error("only jpg,jpeg and png file allowd"));
        }
      }
      if(file.filename == "image2"){
        if(file.mimetype === "pdf"){
          cb(null,true) //cb hosse callback first param hosse error nibe second true false nibe then true hole next kaj korbe
        }
        else{
          cb(new Error("only pdf file allowd"));
        }
      }

    }
});


/** ===============================Start Route ============================================================================== */

/* GET users listing. */
fileUploadRouter.get('/', function(req, res, next) {
  res.render('pages/file-upload');
});

/** single file upload */
fileUploadRouter.post('/single',upload.single('image1'),(req,res)=>{ /** uploadMulter is middleware and single means single file upload */
  console.log(`successfully uploaded`);
  console.log(`here is file informatin after upload file`,req.file)
  res.send("successfully uploaded");
})

/** multiple file upload using upload.array() */
fileUploadRouter.post('/multiple',upload.array('image1',5),(req,res)=>{ /** uploadMulter is middleware and mutiple means array file upload second argument 5 means maximum 5 file can upload at a time*/
  console.log(`successfully uploaded multiple file`);
  res.send("successfully uploaded multiple file");
})

/** multiple file upload using upload.fields() */
/** uploadMulter is middleware and upload.fields means multiple field image file */

fileUploadRouter.post('/multiple-field',upload.fields([
    {name:"image1",maxCount:5},
    {name:"image2",maxCount:5},
]),(req,res)=>{ 
  console.log(`successfully uploaded multiple file by multiple field`);
  res.send("successfully uploaded multiple file  by multiple field");
});

/** if we want only form data then we can use upload.none() */
fileUploadRouter.post('/none',upload.none(),(req,res)=>{ /** uploadMulter is middleware and mutiple means array file upload second argument 5 means maximum 5 file can upload at a time*/
  console.log(`only form data`);
  res.send(`My name is ${req.body.name} and my email name is ${req.body.email}`);
})


module.exports = fileUploadRouter