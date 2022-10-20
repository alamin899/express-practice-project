const jwt = require("jsonwebtoken");

const checkLogin = (req,res,next) =>{
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];//here 0 index we get bearer and index 1 get token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const {username,userId} = decoded;
        /** add username and userId in req */
        req.username = username
        req.userId = userId
        next();       
    } catch{
        res.send("Authentication failed!");
        // next("Authentication failed!")
    }

}

module.exports = checkLogin;