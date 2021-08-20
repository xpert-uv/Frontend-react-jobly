import { useState, useContext } from "react";
import UserContext from "../../../helpers/userContext";
import "./Profile.css";

function Profile({ updateUser }) {
  const currentUser = useContext(UserContext);
  const username = currentUser.username;
  const [updatedUserData, setUpdatedUserData] = useState({
    ...currentUser,
    password: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setError(false);
    setSuccess(false);
    const update = async () => {
      const success = await updateUser(updatedUserData);
      setUpdatedUserData({ ...updatedUserData, password: "" });
      success ? setSuccess(true) : setError(true);
    };
    update();
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUpdatedUserData((fData) => ({ ...fData, [name]: value }));
  };

  return (
    <div className="Profile">
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input id="username" name="username" value={username} disabled />
        </div>
        <div>
          <input
            id="firstName"
            name="firstName"
            value={updatedUserData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>
        <div>
          <input
            id="lastName"
            name="lastName"
            value={updatedUserData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            value={updatedUserData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            value={updatedUserData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <div>
          {error && <p className="Profile-error">Update failed.</p>}
          {success && (
            <p className="Profile-success">Profile successfully updated!</p>
          )}
        </div>
        <div>
          <button>Update!</button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
