
import "./Watchlater.css";
import { useEffect, useState, useRef, useContext } from "react";
import { axiosInstance } from "../../utils/interceptor";
import { Header } from "../../Components/Header/Header";
import { Moviecontext } from "../../App";

export const Watchlater=()=>{

    const[favMovies, setfavMovies]=useState([]);
    // const abortController = useRef(new AbortController());

const {genreList}=useContext(Moviecontext);
    const fetchWatchLater=async()=>{
try {
    const response=await axiosInstance(`/watch-later`);

setfavMovies(response.data);
    
} catch (error) {
    alert(error.message);
}
    }

    useEffect(()=>{
        if(localStorage.getItem("token")){
            fetchWatchLater();
        }

        // return()=>{
        //       abortController.current.abort();
        //     }
        
    },[]);

    const watchLaterTrashHandler=async(movieID)=>{
const response=await axiosInstance("/watch-later",{
    method:"DELETE",
    
    data:{movieID}
})

setfavMovies(response.data);
    }

    return(
        <>
        <Header genreList={genreList}/>
       {
        
        (!localStorage.getItem("token")?(<div className="watch-later-page">
        <img src="https://img.freepik.com/free-photo/white-alarm-clock-sticker-with-inscription-late-blue-background_169016-33594.jpg?w=2000"/>
        <h2>Hello Please <h1>LOGIN</h1> to watch your favourite movies</h2>
    </div>):((favMovies.length===0)?(<div className="watch-laterLogged"><h1>Youb have not added any movies to watch later</h1></div>):
    (<div className="watch-later-logged">
        {
        favMovies.map((item)=>{
            return (
                <div className="watch-later-movies">
                    <img src={`http://localhost:3007/images/${item.image}`}/>
                    <h3>{item.title}</h3>
                    

                    <div className="watch-later-genreList">

                    {
                        item.genre.map((item)=>{
                            return <div className="watch-later-genre">
                                <p>{item.genreVal}</p>
                                </div>
                        })
                    }
                    </div>

                    <div className="delete-icon">

<h3>{item.rate}/5</h3>
<i className="fa-solid fa-trash" onClick={()=>watchLaterTrashHandler(item._id)}></i>

</div>
                    </div>
                
            )
        })
        
    }
    </div>)))
    
       } 
       </>
    )

}