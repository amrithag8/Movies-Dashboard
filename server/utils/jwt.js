const jwt = require('jsonwebtoken');


const generateAccesstoken=(userID)=>{
return jwt.sign({_id:userID}, process.env.JWT_SECRET_KEY);
}

module.exports={generateAccesstoken};