import React, { useState, useContext } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import "./Navbar.css";
import SmartphoneIcon from "@material-ui/icons/Smartphone";
import { userContext } from "../../App";

const Navbar = () => {
  const { state, dispatch } = useContext(userContext);
  const history = useHistory();

  const [mobile, setmobile] = useState(false);

  const toggle = () => {
    setmobile(!mobile);
  };

  const Logout = () => {
    dispatch({ type: "CLEAR" });
    localStorage.clear();
  };
  const Hero = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <nav className="container ">
      <div className="menu_section">
        <ul>
          {!state ? (
            <>
              <li>
                {" "}
                <Link className="menu_link" to="/login">
                  Sign In
                </Link>
              </li>
              <li>
                {" "}
                <Link className="menu_link" to="/register">
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                {" "}
                <Link className="menu_link" to="/event">
                  Event
                </Link>
              </li>
              <li>
                {" "}
                <Link className="menu_link" to="/" onClick={(e) => Logout(e)}>
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
        {mobile && (
          <div className="mobile_menu">
            <ul>
              {!state ? (
                <>
                  <li onClick={(e) => toggle(e)}>
                    <Link className="menu_link" to="/login">
                      Sign In
                    </Link>
                  </li>
                  <li onClick={(e) => toggle(e)}>
                    <Link className="menu_link" to="/register">
                      Sign Up
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li onClick={(e) => toggle(e)}>
                    {" "}
                    <Link className="menu_link" to="/event">
                      Event
                    </Link>
                  </li>
                  <li onClick={(e) => toggle(e)}>
                    <Link className="menu_link" to="/" onClick={Logout}>
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
        <div className="hamberger_menu" onClick={(e) => toggle(e)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="contact_section">
        <span>
          <SmartphoneIcon onClick={Hero} />
        </span>
        <span>+91-984-401-0478</span>
      </div>
    </nav>
  );
};

export default Navbar;
