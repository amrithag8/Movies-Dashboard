const jwt=require("jsonwebtoken");

const checkAuth=(req, res, next)=>{
// console.log("req.headers", req.headers.authorization);
const tokenValid=jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
// console.log("tokenValid", tokenValid);
if(!tokenValid){
    return res.json({message: "Movies can be added to watch later only if you are a valid user"});

}

req.body.userID= tokenValid._id;
next();
}

module.exports=checkAuth;