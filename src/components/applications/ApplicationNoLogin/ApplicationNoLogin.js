import { Link } from "react-router-dom";

function ApplicationNoLogin() {
  return (
    <div>
      <h2>Please sign up or log in to see your applications.</h2>
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

export default ApplicationNoLogin;
