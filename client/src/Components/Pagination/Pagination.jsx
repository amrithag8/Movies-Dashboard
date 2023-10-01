import { useState } from "react";
import "./Pagination.css";
export const Pagination = ({  paginationHandler, moviesTotal, itemsperPage, selectedstar, selectedGenres }) => {
  
  const numbersArray = [];
if(selectedstar.length!==0){
    for (let i = 1; i <= Math.ceil(selectedstar.length / itemsperPage); i++) {
        numbersArray.push(i);
      }
    
}
  
else if(selectedGenres.length!==0){
    for (let i = 1; i <= Math.ceil(selectedGenres.length / itemsperPage); i++) {
        numbersArray.push(i);
      }
}
  
else{
    for (let i = 1; i <= Math.ceil(moviesTotal / itemsperPage); i++) {
        numbersArray.push(i);
      } 
}

  return (
    <div className="Pagination">
      {numbersArray.map((item) => {
        return (
          <div className="pages" onClick={()=>paginationHandler(item)}>
            <h3>{item}</h3>
          </div>
        );
      })}
    </div>
  );
};
