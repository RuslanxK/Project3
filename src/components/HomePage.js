import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getAll } from "../utils";

const usersURL = "http://localhost:8000/api/users";

function HomePage() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: users } = await getAll(usersURL);
      setUsers(users);
    };

    fetchData();
  }, []);

  const userId = sessionStorage["userid"];

  const userFullName = users.map((user) => {
    if (user._id === userId) {
      return <p>{user.fullname}</p>;
    }
  });

  return (
    <div className="homePage">
      <nav class="navbar" style={{ padding: "25px" }}>
        <div class="navbar-end">
          <div class="navbar-item">
            <img
              alt=""
              src="https://top10.netflix.com/images/logo.png"
              width="120"
              height="110"
              id="netflixIcon"
            />
          </div>
        </div>

        <div class="navbar-menu">
          <div class="navbar-end">
            <span
              class="navbar-item"
              onClick={() => navigate("/homepage/movies")}
            >
              Movies
            </span>

            <span
              class="navbar-item"
              onClick={() => navigate("/homepage/members")}
            >
              Members
            </span>
          </div>

          <div class="navbar-end">
            <div class="navbar-item" style={{ color: "white" }}>
              {userFullName}
            </div>

            <div class="navbar-item">
              <button className="logOut" onClick={() => navigate("/")}>
                Log out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div class="video-container">
        <video width="1600" loop="true" autoplay="autoplay" controls>
          <source src="movie.mp4" type="video/mp4" />
        </video>

        <div class="overlay">
          <div
            style={{
              color: "white",
              "font-size": "4rem",
              "font-weight": "700",
              lineHeight: "1.1",
            }}
          >
            <span>MARS</span>
            <br />
            <span>MiSSION</span>
            <br />
            <button className="watchBtn" onClick={() => navigate("/homepage/movies")}>
              Movies
            </button>
            <button
              className="moviesBtn"
              onClick={() => navigate("/homepage/members")}
            >
              {" "}
              Members
            </button>
          </div>
        </div>
      </div>

      <div className="moviesDiv">
        <Outlet />
      </div>
    </div>
  );
}

export default HomePage;
