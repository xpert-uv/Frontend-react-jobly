import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../../helpers/userContext";
import "./Nav.css";

function Nav() {
  const user = useContext(UserContext);
  return (
    <nav className="Nav">
      <NavLink className="NavHome" exact to="/">
        Jobly
      </NavLink>

      {!("username" in user) && (
        <span>
          <NavLink exact to="/signup">
            Sign Up
          </NavLink>
          <NavLink exact to="/login">
            Log In
          </NavLink>
        </span>
      )}
      {"username" in user && (
        <span>
          <NavLink exact to="/companies">
            Companies
          </NavLink>
          <NavLink exact to="/jobs">
            Jobs
          </NavLink>
          <NavLink exact to="/applications">
            Applications
          </NavLink>
          <NavLink exact to="/profile">
            Profile
          </NavLink>
          <NavLink exact to="/logout">
            Log Out {user.username}
          </NavLink>
        </span>
      )}
    </nav>
  );
}

export default Nav;
