import { useState, useEffect, useContext } from "react";
import UserContext from "../../../helpers/userContext";
import JoblyApi from "../../../helpers/api";

import ApplicationCard from "../ApplicationCard/ApplicationCard";

function Applications({ updateApp, deleteApp }) {
  const currentUser = useContext(UserContext);
  const [interested, setInterested] = useState([]);
  const [applied, setApplied] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const res = await JoblyApi.getApplications(currentUser.username);
      console.log(res);
      setInterested(() => res.filter((a) => a.status === "interested"));
      setApplied(() => res.filter((a) => a.status === "applied"));
      setAccepted(() => res.filter((a) => a.status === "accepted"));
      setRejected(() => res.filter((a) => a.status === "rejected"));
    };
    getList();
  }, [currentUser]);

  const intToApply = (id) => {
    const app = interested.filter((a) => a.jobId === id)[0];
    setInterested(() => interested.filter((a) => a.jobId !== id));
    setApplied(() => [app, ...applied]);
  };

  const applyToAccepted = (id) => {
    const app = applied.filter((a) => a.jobId === id)[0];
    setApplied(() => applied.filter((a) => a.jobId !== id));
    setAccepted(() => [app, ...accepted]);
  };

  const applyToRejected = (id) => {
    const app = applied.filter((a) => a.jobId === id)[0];
    setApplied(() => applied.filter((a) => a.jobId !== id));
    setRejected(() => [app, ...rejected]);
  };

  return (
    <div>
      <h1>My Applications</h1>
      <h2>Interested</h2>
      {interested.map((a) => (
        <ApplicationCard
          key={a.jobId}
          app={a}
          cat="interested"
          updateApp={updateApp}
          deleteApp={deleteApp}
          action={intToApply}
        />
      ))}
      <h2>Applied</h2>
      {applied.map((a) => (
        <ApplicationCard
          key={a.jobId}
          app={a}
          cat="applied"
          updateApp={updateApp}
          deleteApp={deleteApp}
          action={[applyToAccepted, applyToRejected]}
        />
      ))}
      <h2>Accepted</h2>
      {accepted.map((a) => (
        <ApplicationCard
          key={a.jobId}
          app={a}
          cat="accepted"
          updateApp={updateApp}
          deleteApp={deleteApp}
          action={null}
        />
      ))}
      <h2>Rejected</h2>
      {rejected.map((a) => (
        <ApplicationCard
          key={a.jobId}
          app={a}
          cat="rejected"
          updateApp={updateApp}
          deleteApp={deleteApp}
          action={null}
        />
      ))}
    </div>
  );
}

export default Applications;
