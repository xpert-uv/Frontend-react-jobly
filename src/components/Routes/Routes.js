import { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import UserContext from "../../helpers/userContext";
import Signup from "../userPages/Signup/Signup";
import Login from "../userPages/Login/Login";
import Profile from "../userPages/Profile/Profile";
import Logout from "../userPages/Logout/Logout";
import Companies from "../companies/Companies/Companies";
import CompanyDetail from "../companies/CompanyDetail/CompanyDetail";
import Jobs from "../jobs/Jobs/Jobs";
import Home from "../Home/Home";
import Applications from "../applications/Applications/Applications";
import ApplicationNoLogin from "../applications/ApplicationNoLogin/ApplicationNoLogin";
import CompaniesNoLogin from "../companies/CompaniesNoLogin/CompaniesNoLogin";

function Routes({
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  saveJob,
  updateApp,
  deleteApp,
}) {
  const currentUser = useContext(UserContext);

  return (
    <Switch>
      <Route exact path="/signup">
        <Signup registerUser={registerUser} />
      </Route>
      <Route exact path="/login">
        <Login loginUser={loginUser} />
      </Route>
      <Route exact path="/profile">
        <Profile updateUser={updateUser} />
      </Route>
      <Route exact path="/logout">
        <Logout logoutUser={logoutUser} />
      </Route>
      <Route exact path="/companies/:handle">
        {"username" in currentUser ? (
          <CompanyDetail saveJob={saveJob} />
        ) : (
          <CompaniesNoLogin />
        )}
      </Route>
      <Route exact path="/companies">
        {"username" in currentUser ? <Companies /> : <CompaniesNoLogin />}
      </Route>
      <Route exact path="/jobs">
        {"username" in currentUser ? (
          <Jobs saveJob={saveJob} />
        ) : (
          <CompaniesNoLogin />
        )}
      </Route>
      <Route exact path="/applications">
        {"username" in currentUser ? (
          <Applications updateApp={updateApp} deleteApp={deleteApp} />
        ) : (
          <ApplicationNoLogin />
        )}
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
