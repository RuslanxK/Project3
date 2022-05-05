import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getById, updateItem } from "../utils";

const movieURL = "http://localhost:8000/api/movies";

function EditMovie() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    name: "",
    premiered: "",
    genres: [],
    imageurl: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: movie } = await getById(movieURL, id);
      setMovie(movie);
    };

    fetchData();
  }, []);

  const update = async () => {
    const splittedGenres = movie.genres.split(",");

    const obj = {
      name: movie.name,
      premiered: movie.premiered,
      genres: splittedGenres,
      imageurl: movie.imageurl,
    };

    const updateData = await updateItem(movieURL, id, obj);

    console.log(updateData.data);

    navigate("/homepage/movies");
  };

  return (
    <div className="childDiv">
      <div className="editMovie">
        <div
          class="title is-3"
          style={{ textAlign: "center", padding: "15px", color: "white" }}
        >
          Edit Movie
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Name</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input
                  class="input"
                  type="text"
                  value={movie.name}
                  required
                  onChange={(e) => setMovie({ ...movie, name: e.target.value })}
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Premiered</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input
                  class="input"
                  type="number"
                  value={movie.premiered}
                  required
                  onChange={(e) =>
                    setMovie({ ...movie, premiered: e.target.value })
                  }
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Genres</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input
                  class="input"
                  type="text"
                  value={movie.genres}
                  required
                  onChange={(e) =>
                    setMovie({ ...movie, genres: e.target.value })
                  }
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Image URL</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  value={movie.imageurl}
                  required
                  onChange={(e) =>
                    setMovie({ ...movie, imageurl: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label"></div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <button id="addBtn" onClick={update}>
                  Update
                </button>
                <button
                  style={{ "margin-left": "5px" }}
                  id="cancelBtn"
                  onClick={() => navigate("/homepage/movies")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMovie;
