import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "../../App";
import "./Login.css";

const Login = () => {
  const history = useHistory();

  const { state, dispatch } = useContext(userContext);

  const [userdata, setuserdata] = React.useState({ email: "", password: "" });

  const [warning, SetError] = React.useState(null);
  const [success, SetSuccess] = React.useState(null);

  const SetUserData = (e) => {
    setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      history.push("/home");
    }
  }, []);

  const UserLogin = (e) => {
    e.preventDefault();

    const { email, password } = { ...userdata };
    if (email === "" || password === "") {
      return SetError("Please Enter All The Fields.");
    }
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return SetError("Please Enter Email in Proper Format.");
    } else {
      const newuser = { email, password };
      fetch(`https://event-scheduler-be.onrender.com/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(newuser),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            SetError(data.error);
          } else {
            dispatch({ type: "USER", payload: { ...data } });
            SetSuccess(data.message);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data));
            setTimeout(() => {
              history.push("/home");
            }, 1000);
          }
        });
    }
  };

  return (
    <div className="login_container">
      <div className="login_wrapper">
        <div className="login_form_section">
          <form onSubmit={(e) => UserLogin} className="login_form">
            <div className="login_heading">
              <h2>Login User</h2>
            </div>
            <div className="toast">
              <p
                className={
                  warning !== null
                    ? "warning"
                    : success !== null
                      ? "success"
                      : null
                }
              >
                {warning !== null ? warning : success !== null ? success : null}
              </p>
            </div>

            <div>
              <input
                type="email"
                placeholder="Email "
                value={userdata.email}
                name="email"
                onChange={(e) => SetUserData(e)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={userdata.password}
                name="password"
                onChange={(e) => SetUserData(e)}
              />
            </div>
            <div>
              <input
                type="submit"
                value="Submit"
                onClick={(e) => UserLogin(e)}
              />
            </div>
            <div>
              <Link className="forgetpassword" to="/">
                Forget Password...
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
