import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../features/lead/leadSlice";
import { Link } from "react-router-dom";

const LeadsDashboard = () => {
  const dispatch = useDispatch();
  const { leads, status, error } = useSelector((state) => state.lead);
  const [leadStatus, setLeadStatus] = useState("");

  const filterLeads = leadStatus
    ? leads.filter((lead) => lead.status === leadStatus)
    : leads;

  const leadStatusCount = (status) => {
    return leads.filter((lead) => lead.status === status).length;
  };

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch, leadStatus]);

  if (status === "error") {
    return (
      <div className="mt-4 bg-white p-4 ">
        <p className="text-center">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container my-4 bg-white p-4 rounded ">
      <h1 className="text-center text-dark">Align CRM Dashboard</h1>
      <hr className="border-dark" />

      {status === "loading" && <p className="text-center">Loading...</p>}
      <div className="card bg-light text-dark p-3 mb-3 border-0">
        <h5 className="card-title">Leads:</h5>
        <div className="row g-2">
          {filterLeads.length > 0 ? (
            filterLeads.map((lead) => (
              <div key={lead._id} className="col-12 col-sm-6 col-md-4">
                <Link
                  to={`/leadDetails/${lead._id}`}
                  className="btn btn-secondary w-100"
                >
                  {lead.name}
                </Link>
              </div>
            ))
          ) : (
            <p>No leads available. Add a new lead to get started.</p>
          )}
        </div>
      </div>

      <div className="card bg-light text-dark p-3 mb-3 border-0">
        <h5 className="card-title">Lead Status:</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item bg-light text-dark">
            New:{" "}
            <span className="badge bg-secondary">
              {leadStatusCount("New")} Leads
            </span>
          </li>
          <li className="list-group-item bg-light text-dark">
            Contacted:{" "}
            <span className="badge bg-secondary">
              {leadStatusCount("Contacted")} Leads
            </span>
          </li>
          <li className="list-group-item bg-light text-dark">
            Qualified:{" "}
            <span className="badge bg-secondary">
              {leadStatusCount("Qualified")} Leads
            </span>
          </li>
          <li className="list-group-item bg-light text-dark">
            Proposal Sent:{" "}
            <span className="badge bg-secondary">
              {leadStatusCount("Proposal Sent")} Leads
            </span>
          </li>
          <li className="list-group-item bg-light text-dark">
            Closed:{" "}
            <span className="badge bg-secondary">
              {leadStatusCount("Closed")} Leads
            </span>
          </li>
        </ul>
      </div>

      <div className="mb-3">
        <strong className="text-dark">Quick Filters:</strong>
        <div className="d-flex flex-wrap gap-2 mt-2">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setLeadStatus("New")}
          >
            New
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setLeadStatus("Contacted")}
          >
            Contacted
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setLeadStatus("Qualified")}
          >
            Qualified
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setLeadStatus("Proposal Sent")}
          >
            Proposal Sent
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setLeadStatus("Closed")}
          >
            Closed
          </button>
        </div>
      </div>

      <div className="text-center">
        <Link to={"/addLead"} className="btn btn-lg w-50 btn-secondary">
          Add New Lead
        </Link>
      </div>
    </div>
  );
};

export default LeadsDashboard;
