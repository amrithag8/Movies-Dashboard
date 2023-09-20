import "./Dashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Dashboard = ({
  _id,
  image,
  rate,
  title,
  genre,
  setMovies
}) => {
  const navigate = useNavigate();

  const deleteHandler = async (id) => {
    const response = await axios("http://localhost:3007/api/movies", {
      method: "DELETE",
      data: { id },
    });

    setMovies(response.data);
  };


  const editmovieHandler = async (id) => {
    if (localStorage.getItem("token")) {
      return navigate(`/addmovie/${id}`);
    }

    navigate("/login");
  };


  const watchmovieHandler = async (id) => {
    if (!localStorage.getItem("token")) {
      return toast.warning("Please login to add movies to watch later");
    }

    const response = await axios(
      `http://localhost:3007/api/users/watch-later`,
      {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token"),
        },

        data: { movieID: id },
      }
    );

    toast.success(response.data.message);
  };

  const starHandler = () => {
    const row = [];
    for (var i = 0; i < rate; i++) {
      row.push(<i className="fa-solid fa-star"></i>);
    }

    return row;
  };
  return (
    <div className="dashboard">
      <img src={`http://localhost:3007/images/${image}`} />
      <h2>{title}</h2>

      <div className="genres-title">
        {genre?.map((item) => {
          return (
            <>
              {" "}
              <div className="genres-list">
                <p> {item?.genreVal}</p>
              </div>{" "}
            </>
          );
        })}
      </div>

      <div>
        {starHandler()}
        {rate !== "undefined" ? (
          <span className="star-count">{rate} /5</span>
        ) : (
          <span className="star-count">1 /5</span>
        )}
      </div>
      <div className="button-card">
        <div className="watch-later" onClick={() => watchmovieHandler(_id)}>
          {/* <h4>Watch Later</h4> */}
          <i className="fa-regular fa-clock"></i>
        </div>
        <div className="edit-movie" onClick={() => editmovieHandler(_id)}>
          <h4>Edit</h4>
          <i className="fa-solid fa-pen-to-square"></i>
        </div>
        <div className="delete-movie" onClick={() => deleteHandler(_id)}>
          <h4>Delete</h4>
          <i className="fa-solid fa-trash-can"></i>
        </div>
      </div>
    </div>
  );
};
