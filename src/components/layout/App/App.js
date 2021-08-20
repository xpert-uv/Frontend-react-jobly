import Routes from "../../Routes/Routes";
import Nav from "../Nav/Nav";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import JoblyApi from "../../../helpers/api";
import UserContext from "../../../helpers/userContext";
import useLocalStorageState from "../../../helpers/hooks";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [username, setUsername] = useLocalStorageState("username", "");
  const [token, setToken] = useLocalStorageState("token", "");

  useEffect(() => {
    const getUserData = async (username) => {
      const res = await JoblyApi.getUser(username);
      setCurrentUser(res);
    };
    JoblyApi.token = token;
    token.length > 0 ? getUserData(username) : setCurrentUser({});
    // eslint-disable-next-line
  }, [token]);

  const registerUser = (newUserData) => {
    const register = async (newUserData) => {
      try {
        const res = await JoblyApi.registerNewUser(newUserData);
        setUsername(newUserData.username);
        setToken(res);
      } catch (err) {
        console.log(err);
      }
    };
    register(newUserData);
  };

  const loginUser = async (userData) => {
    try {
      const res = await JoblyApi.loginUser(userData);
      setUsername(userData.username);
      setToken(res);
      return true;
    } catch (err) {
      console.log(err);
      setToken("");
      return false;
    }
  };

  const updateUser = async (updatedUserData) => {
    try {
      const loginData = (({ username, password }) => ({ username, password }))(
        updatedUserData
      );
      const verified = await JoblyApi.verifyUser(loginData);

      if (verified) {
        const userData = (({ username, firstName, lastName, email }) => ({
          username,
          firstName,
          lastName,
          email,
        }))(updatedUserData);
        const res = await JoblyApi.updateUser(userData);
        setCurrentUser({ ...currentUser, ...res });
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const logoutUser = () => {
    setToken("");
    setUsername("");
    setCurrentUser({});
  };

  const saveJob = (id) => {
    const save = async (id) => {
      console.log("saving...");
      const res = await JoblyApi.saveJob(currentUser.username, id);
      if (res.jobId === id) {
        const jobList = currentUser.jobs;
        jobList.push(id);
        setCurrentUser((currentUser) => ({
          ...currentUser,
          jobs: jobList,
        }));
      }
    };
    save(id);
  };

  const updateApp = (id, newStatus) => {
    const update = async (id, newStatus) => {
      console.log("updating...");
      await JoblyApi.updateApp(currentUser.username, id, newStatus);
    };
    update(id, newStatus);
  };

  const deleteApp = (id) => {
    const remove = async (id) => {
      console.log("deleting...");
      const res = await JoblyApi.deleteApp(currentUser.username, id);
      console.log(res);
      if (res.jobId === id) {
        const jobList = currentUser.jobs;
        const newJobList = jobList.filter((j) => j !== id);
        setCurrentUser((currentUser) => ({
          ...currentUser,
          jobs: newJobList,
        }));
      }
    };
    remove(id);
  };

  return (
    <div className="App">
      <UserContext.Provider value={currentUser}>
        <BrowserRouter>
          <Nav />
          <div className="Content">
            <Routes
              registerUser={registerUser}
              loginUser={loginUser}
              logoutUser={logoutUser}
              updateUser={updateUser}
              saveJob={saveJob}
              updateApp={updateApp}
              deleteApp={deleteApp}
            />
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
