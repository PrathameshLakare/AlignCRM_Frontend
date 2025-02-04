import { useDispatch, useSelector } from "react-redux";
import LeadsByStatus from "../features/report/LeadsByStatus";
import LeadsClosedByAgents from "../features/report/LeadsClosedByAgents";
import LeadsClosedReport from "../features/report/LeadsClosedReport";
import { useEffect } from "react";
import { fetchLeads } from "../features/lead/leadSlice";

const Report = () => {
  const dispatch = useDispatch();
  const { leads, status, error } = useSelector((state) => state.lead);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="container my-4">
        <p className="text-center text-dark">Loading...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="container my-4">
        <p className="text-center text-dark">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h1 className="text-center text-dark">Align CRM Reports</h1>
      <hr className="border-dark" />

      <div className="card bg-light text-dark p-3 mb-3 border-0">
        <h3 className="card-title">Report Overview:</h3>

        <div className="row">
          <LeadsClosedReport leads={leads} />
          <LeadsClosedByAgents leads={leads} />
          <LeadsByStatus leads={leads} />
        </div>
      </div>
    </div>
  );
};

export default Report;
