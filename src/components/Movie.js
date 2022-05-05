import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteItem, getAll } from "../utils";
import AllSubscribersWatched from "./AllSubscribersWatched";

const moviesURL = "http://localhost:8000/api/movies";
const subscriptionsURL = "http://localhost:8000/api/subscriptions";
const membersURL = "http://localhost:8000/api/members";

function Movie({ movie }) {
  const [subscribers, setSubs] = useState([]);
  const [members, setMembers] = useState([]);
  const [movies, setMovies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      const { data: subscribers } = await getAll(subscriptionsURL);
      setSubs(subscribers);

      const { data: members } = await getAll(membersURL);
      setMembers(members);

      const { data: movies } = await getAll(moviesURL);
      setMovies(movies);
    };

    fetchData();
  }, []);


  

  const genresLi = movie.genres.map((g) => {
    return <span style={{ margin: "5px" }}>{g}</span>;
  });

  const deleteMovie = async () => {
    const obj = await deleteItem(moviesURL, movie._id);
    console.log(obj.data);

    const foundSubscriptions = subscribers.filter(
      (subscriber) => subscriber.movieid === movie._id
    );

    if (foundSubscriptions) {
      foundSubscriptions.forEach((sub) => {
        const obj = deleteItem(subscriptionsURL, sub._id);
        console.log(obj);
      });
    }

    window.location.reload()
  };

  return (
    <div className="movie">
      <img alt="" src={movie.imageurl} />
      <h1 style={{ fontSize: "20px" }}>
        {movie.name} - {movie.premiered}
      </h1>{" "}
      <br />
      <div>{genresLi}</div>
      <br />
      <button
        className="editBtn"
        onClick={() => navigate(`/homepage/editmovie/${movie._id}`)}
      >
        Edit
      </button>
      <button className="deleteBtn" onClick={deleteMovie}>
        Delete
      </button>
      <AllSubscribersWatched subscribers={subscribers} movie={movie} members={members} />
    </div>
  );
}

export default Movie;
