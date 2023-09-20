const express = require("express");
const router = express.Router();

const checkAuth = require("../middlewares/checkAuth");

const {
  signup,
  login,
  watchLater,
  addToWatchlater,
  removeFromWatchlater,
} = require("../controllers/userController");

router.post("/signup", signup);

router.post("/login", login);

router.post("/watch-later", checkAuth, addToWatchlater);

router.get("/watch-later", checkAuth, watchLater);

router.delete("/watch-later", checkAuth, removeFromWatchlater);

module.exports = router;
