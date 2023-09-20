const bcrypt=require("bcryptjs");

const SALT=10;

const generateHashedPassword=(password)=>{
return bcrypt.hash(password, SALT);
}


const compareHashedPassword=(password, hashedPassword)=>{
   return bcrypt.compare(password, hashedPassword);
}
module.exports={generateHashedPassword, compareHashedPassword};