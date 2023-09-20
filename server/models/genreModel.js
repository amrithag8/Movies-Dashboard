const mongoose=require("mongoose");

const genreSchema=new mongoose.Schema({
    genreVal:{
        type: String,
        trim: true,
        required: true
    }
    
    
    
})

module.exports=mongoose.model("Genres",genreSchema );