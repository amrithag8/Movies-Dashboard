import "./AddMovie.css";
import { useState , useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../Header/Header";
import { useContext } from "react";
import { Moviecontext } from "../../App";


export const AddMovie = () => {
  const {setMovies, genreList}=useContext(Moviecontext);
  const navigate = useNavigate();
  const {id}=useParams();
  const [genres, setGenres] = useState([]);
  const[image, setImage]=useState(null);
  const[title, setTitle]=useState();
  const[rate, setRate]=useState();
const[imagePreview, setimagePreview]=useState();



  const fetchMovieByID=async()=>{
    const response=await axios(`http://localhost:3007/api/movies/${id}`);
    const { image, genre, rate, title } = response.data;
    setTitle(title);
  
    setimagePreview(`http://localhost:3007/images/${image}`);
    
    setRate(rate * 25);
    setGenres(genre);
  }


  useEffect(()=>{
    if(id){
      fetchMovieByID();
    }
  },[]);


  
 

  const handleFileChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);

    setimagePreview(URL.createObjectURL(event.target.files[0]));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("movie_img", image);
    formData.append("title", title);
    formData.append("rate", rate / 25);
    formData.append("genres", JSON.stringify(genres));
    // formData.append("id", uuidv4());

    const values = { image, title, rate, genres };

    


   
       

    if (!id) {
      try {
        const response = await axios("http://localhost:3007/api/movies", {
          method: "POST",

          headers: {
            "Content-Type": "multipart/form-data",
          },

          data: formData,
        });

        
        setMovies(response.data);
        

        setimagePreview();
        setTitle();
        setRate();
        setGenres([]);
        setImage(null);
        navigate("/movies-dashboard");
      } catch (error) {
        // Handle error here
        console.log("An error occurred:", error);
      }
    } else {
      try {

        
        const response = await axios("http://localhost:3007/api/moviebyID", {
          method: "PUT",

          
          data: {
            image, title, rate:rate/25, id, genres
          }
        });

        setMovies(response.data);
        navigate("/movies-dashboard");
      } catch (error) {
        console.log("An error occurred:", error);
      }
    }
  };

  const checkboxHandler = (e) => {
    
    
    if (e.target.checked) {
      setGenres((prev) => {
        return [...prev, e.target.id];
      });
    } else {
      const filterArr = genres.filter((item) => {
        return item != e.target.id;
      });
      setGenres(filterArr);
    }
  };

  return (

    <>
    <Header/>
    <div className="add-movie-page">
    <div className="add-movie">
      <h2>Add Movie</h2>
      <form className="form" onSubmit={submitHandler}>
        <div className="add-image">
          <div className="input-field">
            <label>Add image</label>
            <input
              type="file"
              accept="image/*"
              className="input"
              onChange={handleFileChange}
            />
          </div>
          {imagePreview && <img src={imagePreview} />}
        </div>

        <div className="title">
          <label>Title</label>
          <div>
            <input
              type="text"
              className="input-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="rating">
          <label>Rating</label>
          <div>
            <input
              type="range"
              min="25"
              max="125"
              step="25"
              className="input-range"
              defaultValue="1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              required
            />
            <div className="span">
              {/* <span>0</span> */}
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>
        </div>

        <div className="checkbox">
          {genreList.map((item) => {
            return (
              <span key={item._id} className="check">
                <label>{item.genreVal}</label>
                <span>
                  <input
                    type="checkbox"
                    value={item.genreVal}
                    id={item._id}
                    checked={genres.includes(item._id) ? true : false}
                    onChange={(e) => checkboxHandler(e)}
                  />
                </span>
              </span>
            );
          })}
        </div>

        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
    </div>
    </>
  );
};
