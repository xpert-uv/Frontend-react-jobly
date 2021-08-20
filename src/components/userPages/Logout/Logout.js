import { Redirect } from "react-router-dom";
import { useEffect } from "react";

function Logout({ logoutUser }) {
  useEffect(() => logoutUser(), [logoutUser]);

  return <Redirect to="/" />;
}

export default Logout;
