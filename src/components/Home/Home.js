import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../helpers/userContext";
import "./Home.css";

function Home() {
  const currentUser = useContext(UserContext);
  console.log(currentUser);
  if ("username" in currentUser) {
    return (
      <div className="Home">
        <h1>Welcome, {currentUser.firstName}!</h1>
        <p>All the jobs are here.</p>
        <div>
          <Link to="/jobs">
            <button>Jobs</button>
          </Link>
          <Link to="/companies">
            <button>Companies</button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Home">
        <h1>Jobly</h1>
        <p>All the jobs are here.</p>
        <div>
          <Link to="/login">
            <button>Log in</button>
          </Link>
          <Link to="/signup">
            <button>Sign up</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
