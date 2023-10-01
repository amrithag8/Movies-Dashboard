const express = require("express");
const router = express.Router();

const checkAuth = require("../middlewares/checkAuth");
// const verifyotp=require("../middlewares/verifyotp");

const {
  signup,
  login,
  watchLater,
  addToWatchlater,
  removeFromWatchlater,
  forgotPassword,
  resetPassword, 
  verifyotp
} = require("../controllers/userController");

router.post("/signup", signup);

router.post("/login", login);

router.post("/watch-later", checkAuth, addToWatchlater);

router.get("/watch-later", checkAuth, watchLater);

router.delete("/watch-later", checkAuth, removeFromWatchlater);

router.post("/forgot-password", forgotPassword)

router.post("/verify-otp",  verifyotp);

router.post("/reset-pass",  resetPassword);


module.exports = router;
