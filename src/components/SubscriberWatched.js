import { useState, useEffect } from "react";
import SubscribeToMovie from "./SubscribeToMovie";
import { getAll } from "../utils";
import { Link } from "react-router-dom";
import axios from "axios";

const moviesURL = "http://localhost:8000/api/movies";
const subscribersURL = "http://localhost:8000/api/subscriptions";

function SubscriberWatched({ member }) {
  const [display, setDisplay] = useState(true);
  const [movies, setMovies] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {

    const accessToken = sessionStorage["accessToken"];
    const fetchData = async () => {

      const { data: movies } = await axios.get(moviesURL, {
        headers: {
          "x-access-token": accessToken,
        },
      });
      
      setMovies(movies);

      const { data: subscribers } = await getAll(subscribersURL);
      setSubscribers(subscribers);
    };

    fetchData();
  }, []);

  const moviesWatched = subscribers.map((subscriber) => {
    let foundMovie = movies.find((movie) => movie._id === subscriber.movieid);

    if (subscriber.memberid === member._id && foundMovie) {
      return (
        <li key={subscriber._id}>
          <Link to={`/homepage/movie/${foundMovie._id}`}>
            {foundMovie.name}
          </Link>{" "}
          - {subscriber.date}
        </li>
      );
    }
  });

  const displaySub = () => {
    setDisplay(!display);
  };

  return (
    <div className="moviesWatched">
      <div>
      <button class="subNewMovie" onClick={displaySub}>
        Subscribe to new movie
      </button>{" "}
      <br />
      {display ? (
        display
      ) : (
        <SubscribeToMovie
          member={member}
          movies={movies}
          subscribers={subscribers}
        />
      )}{" "}
      </div>

      <br />
      <div id='moviesWatched'>
      <div className="title is-5">Movies Watched</div>
      {moviesWatched}
      </div>
    </div>
  );
}

export default SubscriberWatched;
