import { useState, useContext } from "react";
import "./JobCard.css";
import UserContext from "../../../helpers/userContext";

function JobCard({ job, saveJob }) {
  const currentUser = useContext(UserContext);
  const [interested, setInterested] = useState(currentUser.jobs.includes(job.id));

  const handleClick = () => {
    saveJob(job.id);
    setInterested(true);
    setInterested(currentUser.jobs);
  };

  return (
    <div className="JobCard">
      <h2>
        {job.title} {job.companyHandle && <small><em> - {job.companyHandle}</em></small>}
      </h2>
      <div className="JobCard-lower">
        <div className="JobCard-details">
          <p>Salary: {job.salary}</p>
          <p>Equity: {job.equity}</p>
        </div>
        <div className="JobCard-apply">
          <button onClick={handleClick} disabled={interested}>
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
