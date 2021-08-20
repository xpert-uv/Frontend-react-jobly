import "./ApplicationCard.css";

function ApplicationCard({ app, cat, updateApp, deleteApp, action }) {
  // const handleUpdate = (newStatus) => {
  //   updateApp(app.jobId, newStatus);
  //   action(app.jobId);
  // };

  const handleApply = () => {
    updateApp(app.jobId, "applied");
    action(app.jobId);
  };

  const handleAccept = () => {
    updateApp(app.jobId, "accepted");
    action[0](app.jobId);
  };

  const handleReject = () => {
    updateApp(app.jobId, "rejected");
    action[1](app.jobId);
  };

  const handleDelete = () => {
    deleteApp(app.jobId);
  };

  return (
    <div className="ApplicationCard">
      <h2>
        {app.title}{" "}
        <small>
          <em> - {app.companyHandle}</em>
        </small>
      </h2>
      <div className="ApplicationCard-lower">
        <div className="ApplicationCard-details">
          <p>Salary: {app.salary}</p>
          <p>Equity: {app.equity}</p>
        </div>
        <div className="ApplicationCard-update">
          {cat === "interested" && <button onClick={handleApply}>Apply</button>}
          {cat === "applied" && (
            <button onClick={handleAccept}>Accepted</button>
          )}
          {cat === "applied" && (
            <button onClick={handleReject}>Rejected</button>
          )}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationCard;
