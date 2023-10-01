import "./AddGenre.css";
import { Genres } from "../Genres/Genres";
import { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../Header/Header";
import { useContext } from "react";
import { Moviecontext } from "../../App";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export const AddGenre=()=>{

    

    const {setGenreList, genreList}= useContext(Moviecontext);

const[genreVal, setgenreVal]=useState("");
const[genreValue, setgenreValue]=useState("");
const[UpdatedVal, setUpdatedVal]=useState("");
const[genreId, setgenreId]=useState("");
const[update, setUpdate]=useState(false);




    


    const genreUpdateHandler=(id, val)=>{

        setUpdate(true);
        
        setgenreValue(val);
        setgenreId(id);

        
        
    }

    

    // const updateGenreHandler=async()=>{
    //     const response=await axios("http://localhost:3007/api/genres",{
    //         method:"PUT", 
    //         data:{
    //             id:genreId,val:genreValue, UpdatedVal:genreVal
    //         }
    //     })

    //     setGenreList(response.data);

    //     setgenreValue("");
    //     setgenreVal("");

    // }



    const addGenreHandler=async(e)=>{
        e.preventDefault();

        // console.log("e", e.target.genre.value);
        // setgenreVal(e.target.genre.value);
        try {

            const genre=e.target.genre.value;

        setUpdatedVal(e.target.genre.value);

        if(!update){
            const response=await axios("http://localhost:3007/api/genres",{
                method:"POST",
                data:{genre}
            } );
            setGenreList(response.data);
            // console.log("from AddGenre.jsx resp.data",response.data);
            setgenreVal("");
            setgenreValue("");
        }

        else{
            const response=await axios("http://localhost:3007/api/genres",{
                method:"PUT", 
                data:{
                    id:genreId,val:genreValue, UpdatedVal:genreVal
                }
            })
    
            setGenreList(response.data);
    
            setgenreValue("");
            setgenreVal("");
            setUpdate(false);
        }
        
            
        } catch (error) {
           toast.warning(error.response.data.message); 
        }
        
    }


    const trashHandler=async(id)=>{
        const response=await axios ("http://localhost:3007/api/genres", {
            method: "DELETE", 
            data: {id}
        })

        

        setGenreList(response.data);
    }

    return(
        <>

        <Header genreList={genreList}/>
        
        <div className="genre">
<label>Add Genre</label>
            <form className="genre-input" onSubmit={(e)=>addGenreHandler(e)}>
                
                <input type="text" className="genre-text" value={genreVal?genreVal:genreValue}  name="genre" onChange={(e)=>setgenreVal(e.target.value)} />
                
                <button type="submit" >Add</button>
                
            </form>

            {/* <button onClick={updateGenreHandler}>Update</button> */}

            <div className="display-genre-list">
                {
genreList.map((item)=>{
    return <Genres key={item.genreID} item={item} genreUpdateHandler={genreUpdateHandler} genreVal={genreVal} trashHandler={trashHandler} setgenreValue={setgenreValue}/>
})
                }
            
            </div>

            </div>
            </>


          


        
    )
}