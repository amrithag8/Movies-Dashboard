import "./Genres.css";
import axios from "axios";
import { useState } from "react";
export const Genres=({item, trashHandler, genreUpdateHandler})=>{

// const[genreValue, setgenreValue]=useState("");
    
    
    return(
<div className="genre-list">
    <p>{item.genreVal}</p>
    <i className="fa-solid fa-pen-to-square" onClick={()=>genreUpdateHandler(item._id, item.genreVal)}></i>
    <i className="fa-solid fa-trash-can" onClick={()=>trashHandler(item._id )}></i>
    
</div>
    )
}