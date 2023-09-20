const express = require("express");
const Router = express.Router();

const {
  getAllGenres,
  addNewGenre,
  editGenre,
  deleteGenre,
} = require("../controllers/genreController");

Router.get("/", getAllGenres);

Router.post("/", addNewGenre);

Router.put("/", editGenre);

Router.delete("/", deleteGenre);

module.exports = Router;
