// const verifyotp=(req, res, next)=>{
//     const{otp, email, receivedotp}=req.body;
//     if(otp===receivedotp){
//         next();
//     }
//     res.status(400).json({message:"OTP does not match"});

// }

// module.exports=verifyotp;