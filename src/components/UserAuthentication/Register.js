import React, { useContext } from "react";
import { Link, Route, useHistory } from "react-router-dom";
import "./Register.css";
import { userContext } from "../../App";

const Register = () => {
  const history = useHistory();

  const { state, dispatch } = useContext(userContext);

  const [userdata, setuserdata] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [warning, SetWarning] = React.useState(null);
  const [success, SetSuccess] = React.useState(null);

  const SetUserData = (e) => {
    setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const token = localStorage.getItem("token");
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (token) {
      dispatch({ type: "USER", payload: { ...user } });
      history.push("/home");
    }
  }, [token]);

  const UserRegister = (e) => {
    const { firstName, lastName, email, password } = { ...userdata };

    e.preventDefault();

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      return SetWarning("Please Enter All The Fields.");
    }
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return SetWarning("Please Enter Email in Proper Format.");
    } else {
      const newuser = { firstName, lastName, email, password };
      fetch(`https://event-scheduler-be.onrender.com/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(newuser),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            SetWarning(data.error);
          } else {
            SetSuccess(data.message);
            dispatch({ type: "USER", payload: { ...data } });
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data));

            setTimeout(() => {
              history.push("/home");
            }, 1000);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="register_container">
      <div className="register_wrapper">
        <div className="register_form_section">
          <form onSubmit={(e) => UserRegister(e)} className="register_form">
            <div className="register_heading">
              <h2>Register User</h2>
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
                type="text"
                placeholder="First Name"
                name="firstName"
                value={userdata.firstName}
                onChange={(e) => SetUserData(e)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                value={userdata.lastName}
                name="lastName"
                onChange={(e) => SetUserData(e)}
              />
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
                onClick={(e) => UserRegister(e)}
              />
            </div>
            <div>
              <Link to="/login" className="loginlink">
                Already Have An Account...
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
