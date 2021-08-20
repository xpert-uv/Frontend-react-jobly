import { useState } from "react";
import { useHistory } from "react-router";
import "./Signup.css";

function Signup({ registerUser }) {
  const defaultData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const [newUserData, setNewUserData] = useState(defaultData);
  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    registerUser(newUserData);
    history.push("/");
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setNewUserData((fData) => ({ ...fData, [name]: value }));
  };

  return (
    <div className="Signup">
      <h1>Signup!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            id="username"
            name="username"
            value={newUserData.username}
            onChange={handleChange}
            placeholder="Username"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            value={newUserData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <div>
          <input
            id="firstName"
            name="firstName"
            value={newUserData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>
        <div>
          <input
            id="lastName"
            name="lastName"
            value={newUserData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            value={newUserData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div>
          <button>Sign up!</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
