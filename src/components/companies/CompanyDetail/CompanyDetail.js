import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../../../helpers/api";
import JobCard from "../../jobs/JobCard/JobCard";

import "./CompanyDetail.css";

function CompanyDetail({ saveJob }) {
  const { handle } = useParams();

  const [company, setCompany] = useState("");

  useEffect(() => {
    JoblyApi.getCompany(handle)
      .then((res) => {
        setCompany(res);
      })
      .catch((err) => console.log(err));
    //eslint-disable-next-line
  }, []);

  if (company.jobs) {
    return (
      <div className="CompanyDetail">
        <h2>{company.name}</h2>
        <p>{company.description}</p>
        {company.jobs.map((j) => (
          <JobCard key={j.id} job={j} saveJob={saveJob} />
        ))}
      </div>
    );
  } else {
    return <h2>Loading...</h2>;
  }
}

export default CompanyDetail;
