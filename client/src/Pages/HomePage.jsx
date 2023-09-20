import { Dashboard } from "../Components/Dashboard/Dashboard";
import "./HomePage.css";
import { Header } from "../Components/Header/Header";
export const HomePage=({movies, setMovies})=>{
    return(
        <>
        <Header/>
<div className="Home">



{
 movies.map((item)=>{
  return <Dashboard  {...item} setMovies={setMovies} />
})

      }
   
</div>
</>
    )
}