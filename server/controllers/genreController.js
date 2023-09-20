
const Genre=require("../models/genreModel");


exports.getAllGenres=async(req, res) => {

    const genreList=await Genre.find();
    res.json(genreList);
  };


  exports.addNewGenre=async(req, res) => {
    const { genre } = req.body;
    const isExist=await Genre.findOne({genreVal:genre});

    
  if(!isExist){
    await Genre.create({genreVal:genre});
    const genres=await Genre.find();
  
    return res.status(200).json(genres);
  }
    // genreArr.push({ genreID: uuidv4(), genreVal: genre });

    // res.status(400).json({message: "This genre exists"});

   res.status(401).json({message:"This genre already exists" });

    
  }

  exports.editGenre=async(req, res) => {
    const { id, UpdatedVal } = req.body;
  
    // const ind = genreArr.findIndex((item) => {
    //   return item.genreID === id;
    // });
  
    // genreArr[ind].genreVal = UpdatedVal;
    await Genre.findByIdAndUpdate(id, {genreVal: UpdatedVal});
  const genres=await Genre.find();
    res.json(genres);
  };


  exports.deleteGenre=async(req, res) => {
    const { id } = req.body;
    
  
    
    await Genre.findByIdAndDelete(id);
    const genres=await Genre.find();

  
    res.json(genres);
  }