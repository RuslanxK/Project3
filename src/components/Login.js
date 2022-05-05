import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const authURL = "http://localhost:8000/api/auth/login";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const login = async () => {
    const { data } = await axios.post(authURL, user);
    sessionStorage["accessToken"] = data.accessToken;
    sessionStorage["userid"] = data.user;
    navigate("homepage");
  };

  return (
    <div className="loginPage">
      <div className="LoginForm">
        <img
          alt=""
          src="https://top10.netflix.com/images/logo.png"
          width="200"
          style={{ alignSelf: "center" }}
        />{" "}
        <br />
        <div
          class="title is-4"
          style={{ color: "white", "font-weight": "700" }}
        >
          Sign In
        </div>
      
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input
              class="input"
              type="text"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <div className="buttonDiv">
              <button className="loginBtn" onClick={login}>
                Sign In
              </button>{" "}
              <br />
              <p>
                New to NetFlix? - <Link to="/register">Sign Up Now!</Link>
              </p>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
