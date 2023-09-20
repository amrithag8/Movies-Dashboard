import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import { createContext } from "react";
import "./App.css";
import { AddMovie } from "./Components/AddMovie/AddMovie";
import { AddGenre } from "./Components/AddGenre/AddGenre";
import { ToastContainer, toast } from 'react-toastify';
import { Dashboard } from "./Components/Dashboard/Dashboard";
import { HomePage } from "./Pages/HomePage";
import { useNavigate } from "react-router-dom";
import { Login } from "./Pages/Login/Login";
import { Route, Routes } from "react-router-dom";
import { Signup } from "./Pages/SignUp/Signup";
import { Watchlater } from "./Pages/Watchlater/Watchlater";
import { ProtectedRouteAfterLogin } from "./Components/ProtectedRouteAfterLogin";
export const Moviecontext=createContext();
function App() {
  const [movies, setMovies] = useState([]);
  const [genreList, setGenreList] = useState([]);
  





  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios("http://localhost:3007/");
      setMovies(response.data);
      
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchGenre = async () => {
      const response = await axios("http://localhost:3007/api/genres");
      setGenreList(response.data);
    };

    fetchGenre();
  }, []);

  return (
    <>

<Moviecontext.Provider value={{genreList,setMovies, setGenreList, movies }}>
      <Routes>
        <Route
          path="/addmovie"
          element={<AddMovie />}
        />

        <Route
          path="/genre"
          element={
            <AddGenre />
          }
        />

        <Route
          path="/addmovie/:id"
          element={<AddMovie />}
        />

        <Route path="/watchlater" element={<Watchlater />} />

        <Route element={<ProtectedRouteAfterLogin />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route
          path="/movies-dashboard"
          element={<HomePage movies={movies} setMovies={setMovies} />}
        />
      </Routes>
      <ToastContainer/>
      </Moviecontext.Provider>
    </>
  );
}

export default App;
