import { Dashboard } from "../Components/Dashboard/Dashboard";
import "./HomePage.css";
import { Header } from "../Components/Header/Header";
import { Pagination } from "../Components/Pagination/Pagination";
import { useState } from "react";
export const HomePage = ({
  movies,
  setMovies,
  genreList,
  selectedstar,
  setSelectedstar,
  selectedGenres,
  setSelectedGenres,
}) => {
  

  const moviesTotal = movies.length;
  const [itemsperPage, setItemsperPage] = useState(6);
  const [currentpage, setCurrentpage] = useState(1);

  const paginationHandler = (number) => {
    setCurrentpage(number);
  };
  const startingIndex = currentpage * itemsperPage - itemsperPage;
  const endingIndex = currentpage * itemsperPage;

  return (
    <>
      <Header
        genreList={genreList}
        setSelectedstar={setSelectedstar}
        setSelectedGenres={setSelectedGenres}
        setCurrentpage={setCurrentpage}
      />
      <div className="Home">
        {selectedGenres.length === 0
          ? selectedstar.length !== 0
            ? selectedstar?.slice(startingIndex, endingIndex).map((item) => {
                return <Dashboard {...item} setMovies={setMovies} />;
              })
            : movies?.slice(startingIndex, endingIndex).map((item) => {
                return <Dashboard {...item} setMovies={setMovies} />;
              })
          : selectedGenres?.slice(startingIndex, endingIndex).map((item) => {
              return <Dashboard {...item} setMovies={setMovies} />;
            })}
      </div>
      <Pagination
        movies={movies}
        paginationHandler={paginationHandler}
        moviesTotal={moviesTotal}
        itemsperPage={itemsperPage}
        selectedstar={selectedstar}
        selectedGenres={selectedGenres}
      />
    </>
  );
};
