const Movie=require("../models/movieModel");

exports.postMovies=async(req, res) => {

   
   

    await Movie.create({title: req.body.title,rate: req.body.rate, image: req.file.filename, 
 genre: JSON.parse(req.body.genres)});
    const movies=await Movie.find().populate("genre");
     // moviesArr.push({
     //   movieID: req.body.id,
     //   title: req.body.title,
     //   rate: req.body.rate,
     //   genres: JSON.parse(req.body.genres),
     //   image: req.file.filename,
     // });
   
     res.json(movies);
   }


   exports.getAllMovies=async(req, res) => {
    const movies=await Movie.find().populate("genre")

    res.json(movies);
  }


  exports.deleteMovie=async(req, res) => {
    const { id } = req.body;
    
  
    // const index = moviesArr.findIndex((item) => {
    //   return item.movieID === id;
    // });
  
    // moviesArr.splice(index, 1);

    await Movie.findByIdAndDelete(id);
    const movies=await Movie.find().populate("genre");

  
    res.json(movies);
  }

  exports.getMovieByID=async(req, res) => {
    const { id } = req.params;
  
    // const filterMoviesArr = moviesArr.filter((item) => {
    //   return item.movieID === id;
    // });

    const filterMoviesArr =await Movie.findById(id);
    // console.log(filterMoviesArr);
  
    res.json(filterMoviesArr);
  }

  exports.editMovies=async(req, res) => {
    const { id, title, rate, genres } = req.body;
  
    
  
    // const index = moviesArr.findIndex((item) => {
    //   return item.movieID === req.body.movieID;
    // });
  
    // moviesArr[index].title = title;
    // moviesArr[index].rate = rate;
    // moviesArr[index].genres = genres;

    await Movie.findByIdAndUpdate(id, {rate, title, genre:genres})
    const movies=await Movie.find().populate("genre");
    

    res.json(movies);
  }