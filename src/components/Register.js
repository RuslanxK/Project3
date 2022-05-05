import { useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const authURL = "http://localhost:8000/api/auth/register";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const register = async () => {
    const { data } = await axios.post(authURL, user);
    console.log(data);
    navigate("/");
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
          Sign Up
        </div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="text"
              placeholder="Fullname"
              name="fullname"
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
              <button className="loginBtn" onClick={register}>
                Sign Up
              </button>{" "}
              <br />
              <p>
                Already Member? - <Link to="/">Sign In Now!</Link>
              </p>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
