const mongoose = require("mongoose");
const User = require("../models/userModel");
const SendEmail = require("../utils/sendEmail");
const {
  generateHashedPassword,
  compareHashedPassword,
} = require("../utils/bcrypt");
const { generateAccesstoken } = require("../utils/jwt");

exports.signup = async (req, res) => {
  const { name, age, email, password, gender } = req.body;

  const isExist = await User.findOne({ email: email });
  if (isExist) {
    return res.status(401).json({ message: "Email already exists" });
  }

  const hashedPassword = await generateHashedPassword(password);

  await User.create({ name, age, email, password: hashedPassword, gender });
  const users = await User.find();

  res.json(users);
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const loggedUser = await User.findOne({ email: username });

  if (!loggedUser) {
    console.log("Username invalid");
    return res.status(401).json({ message: "Username/Password Invalid" });
  }

  const passwordCheck = await compareHashedPassword(
    password,
    loggedUser.password
  );
  if (!passwordCheck) {
    return res.status(401).json({ message: "Username/Password Invalid" });
  }

  const AccessToken = generateAccesstoken(loggedUser._id);

  res.status(200).json({
    userID: loggedUser._id,
    name: loggedUser.name,
    gender: loggedUser.gender,
    age: loggedUser.age,
    email: loggedUser.email,
    AccessToken,
  });
};

exports.watchLater = async (req, res) => {
  const favMovies = await User.findById(req.body.userID)
    .select("movies")
    .populate({ path: "movies", populate: { path: "genre" } });

  res.json(favMovies.movies);
};

exports.addToWatchlater = async (req, res) => {
  const movielist = await User.findById(req.body.userID).select("movies");
  const isExist = movielist.movies.includes(req.body.movieID);

  if (isExist) {
    return res.json({ message: "Movie added to watch later" });
  }

  await User.findByIdAndUpdate(req.body.userID, {
    $push: { movies: { _id: req.body.movieID } },
  });

  res.json({ message: "Movie added to watch later" });
};

exports.removeFromWatchlater = async (req, res) => {
  await User.findByIdAndUpdate(req.body.userID, {
    $pull: { movies: req.body.movieID },
  });
  const deletedArr = await User.findById(req.body.userID)
    .select("movies")
    .populate({ path: "movies", populate: { path: "genre" } });

  res.json(deletedArr.movies);
};

exports.forgotPassword = async (req, res) => {
  const { userEmail } = req.body;
  const isExist = await User.findOne({ email: userEmail });
  if (!isExist) {
    return res.status(400).json({ message: "The email is invalid" });
  }

  let otp="";
  for(let i=0; i<4; i++){
    otp=otp+Math.floor(Math.random()*10);
  }

  
  SendEmail(userEmail, otp);
  res.status(200).json({ message: `OTP sent to ${userEmail} successfully`, otp:otp, email:userEmail });
};

exports.verifyotp=async(req, res)=>{
const{otp, email, receivedotp}=req.body;

if(otp===receivedotp){
 return res.status(200).json({message:"OTP verified succesfully"});
}
res.status(400).json({message:"OTP does not match"});
}

exports.resetPassword=async(req, res)=>{
const{verifiedEmail,newPassword}=req.body;
const hashPassword=await generateHashedPassword(newPassword);
const userValid=await User.findOneAndUpdate({email:verifiedEmail}, {password:hashPassword});
// console.log("hashPassword", hashPassword);
// console.log("userValid", userValid);

res.status(200).json({message:"Password reset successfull"});

}