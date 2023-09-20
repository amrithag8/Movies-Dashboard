const mongoose=require("mongoose");


const userSchema=new mongoose.Schema({
    name: {
        type: String,
        trim: true, 
        required: true
    },

    age: {
        type: Number,
        required:true
    },
    gender:{
        type: String,
        required: true,
        enum:["male", "female"]
    },
    email: {
        type: String,
        trim: true, 
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    movies: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Movies"
    }]
})

module.exports=mongoose.model("Users", userSchema);