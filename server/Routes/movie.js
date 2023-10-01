const multer = require("multer");
const express = require("express");
const Router = express.Router();
const Movie = require("../models/movieModel");
const {
  postMovies,
  getAllMovies,
  deleteMovie,
  getMovieByID,
  editMovies,
  getByGenre,
  getByRating
} = require("../controllers/movieController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

const upload = multer({ storage: storage });

Router.post("/api/movies", upload.single("movie_img"), postMovies);

Router.get("/", getAllMovies);

Router.get("/api/movies", getByGenre);

Router.get("/api/movies/ratings", getByRating);

Router.delete("/api/movies", deleteMovie);

Router.get("/api/movies/:id", getMovieByID);

Router.put("/api/moviebyID", editMovies);

module.exports = Router;
