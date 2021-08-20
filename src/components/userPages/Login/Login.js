import { useState } from "react";
import { useHistory } from "react-router";
import "./Login.css";

function Login({ loginUser }) {
  const blankForm = { username: "", password: "" };
  const [userData, setUserData] = useState(blankForm);
  const [error, setError] = useState(false);
  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const login = async () => {
      const success = await loginUser(userData);
      setUserData(blankForm);
      success ? history.push("/") : setError(true);
    };
    login();
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserData((fData) => ({ ...fData, [name]: value }));
  };

  return (
    <div className="Login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            placeholder="username"
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="password"
            required
          />
        </div>
        {error && <p>Login failed.</p>}
        <div>
          <button>Log in!</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
