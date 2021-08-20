import { Link } from "react-router-dom";

function CompaniesNoLogin() {
  return (
    <div>
      <h2>Please sign up or log in to view company and job information.</h2>
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

export default CompaniesNoLogin;
