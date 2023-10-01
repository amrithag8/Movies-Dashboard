const mongoose=require("mongoose");

const movieSchema=new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true
    },
    rate:{
        type:Number,
        required:true
    },
    image:{
        type: String,
        required:true
    }, 
    genre:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Genres"
    }]
    
    
},{timestamps:true})

module.exports=mongoose.model("Movies", movieSchema );