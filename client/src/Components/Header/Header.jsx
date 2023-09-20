import "./Header.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const Header=({setMovieID, setimagePreview, setRate, setImage, setTitle, setGenres})=>{

const navigate=useNavigate();
    const navigateHandler=()=>{
        
        // setimagePreview();
        // setRate(1);
        // setImage(null);
        // setTitle("");
        // setGenres([]);
        // setMovieID();
        navigate("/addmovie");
    }


    const logoutHandler=()=>{
        localStorage.clear();
        // setUsers([]);
        navigate("/login");

    }
    return(
        <div className="header">
            <h1>MOVIE DASHBOARD</h1>
            <nav className="navigation-menu">


<ul>
    <li>
{localStorage.getItem("name")&& <h3 className="username">Hello {localStorage.getItem("name")}</h3>}</li>
    <li><Link to="/movies-dashboard">HOME</Link></li>
    <li onClick={navigateHandler}>ADD MOVIE</li>
    <li><Link to="/genre">GENRES</Link></li>
    <li><Link to="/watchlater">WATCH LATER</Link></li>
    {
        localStorage.getItem("token")?<li onClick={logoutHandler}>LOGOUT</li>:<li><Link to="/login">LOGIN</Link></li>
    }
    
</ul>
            </nav>
        </div>
    )
}