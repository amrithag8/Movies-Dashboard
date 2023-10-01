import "./Header.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Header = ({
  genreList,
  setCurrentpage,
  setSelectedstar,
  setSelectedGenres,
}) => {
  const [selectGenre, setSelectGenre] = useState("");
  
  const reference = useRef();
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/addmovie");
  };

  const logoutHandler = () => {
    localStorage.clear();

    navigate("/login");
  };

  const starHandler = () => {
    const row = [];
    for (var i = 0; i < 5; i++) {
      row.push(<i className="fa-solid fa-star "></i>);
    }

    return row;
  };

  const ratingsHandler = async (e) => {
    setCurrentpage(1);
    setSelectGenre("");
    setSelectedGenres([]);

    console.log("ratingsHandler");

    const response = await axios("http://localhost:3007/api/movies/ratings", {
      params: {
        rating: e.target.id,
      },
    });
    setSelectedstar(response.data);
  };

  const clearHandler = () => {
    setSelectedstar([]);
    setSelectedGenres([]);
    setSelectGenre("");
    setCurrentpage(1);
  };

  const genresHandler = async (e) => {
    console.log("genresHandler");
    setSelectGenre(e.target.value);
    setSelectedstar([]);

    try {
      if (e.target.value === "Select with Genres") {
        setSelectedGenres([]);
      } else {
        const response = await axios("http://localhost:3007/api/movies", {
          params: {
            genreValue: e.target.value,
          },
        });

        setSelectedGenres(response.data);
      }
    } catch (error) {
      toast.warning(error.response.data.message);
    }
  };

  return (
    <div className="header-outer">
      <div className="search-genre">
        <select
          name="genres"
          value={selectGenre}
          onChange={(e) => genresHandler(e)}
        >
          <option value="Select with Genres">Select with Genres</option>

          {genreList?.map((item) => {
            return <option value={item.genreVal}>{item.genreVal}</option>;
          })}
        </select>

        <div className="rating-search">
          <h2>Search with ratings</h2>
          <label htmlFor="1">1</label>
          <input
            type="radio"
            name="rating"
            id="1"
            onChange={(e) => ratingsHandler(e)}
          />
          <label htmlFor="2">2</label>
          <input
            type="radio"
            name="rating"
            id="2"
            onChange={(e) => ratingsHandler(e)}
          />
          <label htmlFor="3">3</label>
          <input
            type="radio"
            name="rating"
            id="3"
            onChange={(e) => ratingsHandler(e)}
          />
          <label htmlFor="4">4</label>
          <input
            type="radio"
            name="rating"
            id="4"
            onChange={(e) => ratingsHandler(e)}
          />
          <label htmlFor="5">5</label>
          <input
            type="radio"
            name="rating"
            id="5"
            onChange={(e) => ratingsHandler(e)}
          />
          <button onClick={clearHandler}>Clear</button>
        </div>
      </div>

      <div className="header">
        <h1>MOVIE DASHBOARD</h1>
        <nav className="navigation-menu">
          <ul>
            <li>
              {localStorage.getItem("name") && (
                <h3 className="username">
                  Hello {localStorage.getItem("name")}
                </h3>
              )}
            </li>
            <li>
              <Link to="/movies-dashboard">HOME</Link>
            </li>
            <li onClick={navigateHandler}>ADD MOVIE</li>
            <li>
              <Link to="/genre">GENRES</Link>
            </li>
            <li>
              <Link to="/watchlater">WATCH LATER</Link>
            </li>
            {localStorage.getItem("token") ? (
              <li onClick={logoutHandler}>LOGOUT</li>
            ) : (
              <li>
                <Link to="/login">LOGIN</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};
