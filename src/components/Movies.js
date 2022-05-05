import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Movie from "./Movie";
import axios from "axios";

const moviesURL = "http://localhost:8000/api/movies";

function Movies() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    const accessToken = sessionStorage["accessToken"];

    const fetchData = async () => {
      const { data: movies } = await axios.get(moviesURL, {
        headers: {
          "x-access-token": accessToken,
        },
      });

      setMovies(movies);
      setFilteredMovies(movies);
    };

    fetchData();
  }, []);

  const movieComp = filteredMovies.map((movie) => {
    return <Movie key={movie._id} movie={movie} />;
  });

  const handleChange = (e) => {
    setSearchVal(e.target.value);
  };

  const searchMovie = (e) => {
    e.preventDefault();

    setFilteredMovies([
      ...movies.filter((movie) =>
        movie.name.toLowerCase().startsWith(searchVal)
      ),
    ]);
  };

  return (
    <div>
      <div className="searchBar">
        <form onSubmit={searchMovie}>
          <div class="field has-addons">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="name"
                onChange={handleChange}
              />
            </div>
            <div class="control">
              <button
                id="searchBtn"
                style={{ marginLeft: "5px", border: "2px solid white" }}
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="btns">
        <button
          className="allMoviesBtn"
          onClick={() => navigate("/homepage/movies")}
        >
          All Movies
        </button>
        <button
          className="addMovieBtn"
          onClick={() => navigate("/homepage/addmovie")}
        >
          Add Movie
        </button>
      </div>

      <div className="movies">{movieComp}</div>
    </div>
  );
}

export default Movies;
