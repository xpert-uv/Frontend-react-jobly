import CompanyCard from "../CompanyCard/CompanyCard";

function CompanyList({ companies }) {
  return (
    <div>
      {companies.map((c) => (
        <CompanyCard key={c.handle} company={c} />
      ))}
    </div>
  );
}

export default CompanyList;
