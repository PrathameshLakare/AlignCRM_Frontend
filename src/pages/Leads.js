import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../features/lead/leadSlice";
import { Link } from "react-router-dom";
import { fetchSalesAgents } from "../features/agent/agentSlice";

const Leads = () => {
  const dispatch = useDispatch();
  const { leads, status, error } = useSelector((state) => state.lead);
  const { agents } = useSelector((state) => state.agent);

  const [leadStatus, setLeadStatus] = useState("");
  const [inputSalesAgent, setInputSalesAgent] = useState("");
  const [sortByPriority, setSortByPriority] = useState("");
  const [sortByTimeToClosed, setSortByTimeToClosed] = useState(false);

  useEffect(() => {
    dispatch(
      fetchLeads({
        status: leadStatus,
        salesAgent: inputSalesAgent,
        priority: sortByPriority,
      })
    );
  }, [dispatch, leadStatus, inputSalesAgent, sortByPriority]);

  useEffect(() => {
    dispatch(fetchSalesAgents());
  }, [dispatch, leadStatus]);

  const sortedLeads = [...leads].sort((a, b) => {
    return b.timeToClose - a.timeToClose;
  });

  const filterLead = sortByTimeToClosed ? sortedLeads : leads;

  if (status === "error") {
    return (
      <div className="mt-4 bg-white p-4 rounded shadow-sm ">
        <p className="text-center text-danger fw-bold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container my-4 bg-white p-4 rounded shadow ">
      <h1 className="text-center text-dark">Leads Dashboard</h1>
      <hr className="border-dark" />

      <h4 className="text-dark mb-3">Lead Overview</h4>
      <div>
        {filterLead.length > 0 ? (
          <ul className="list-group ">
            {filterLead.map((lead) => (
              <li key={lead._id} className="list-group-item bg-light">
                <Link
                  to={`/leadDetails/${lead._id}`}
                  className="text-dark text-decoration-none"
                >
                  {lead.name} - {lead.status} -{" "}
                  {lead.salesAgent?.name || "No Agent"}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted">No leads available.</p>
        )}
      </div>

      <div className="row my-4">
        <div className="col-md-6">
          <label className="fw-bold">Filter by Status:</label>
          <select
            className="form-select my-1"
            value={leadStatus}
            onChange={(e) => setLeadStatus(e.target.value)}
          >
            <option disabled value={""}>
              Select lead status
            </option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="fw-bold">Filter by Sales Agent:</label>
          <select
            className="form-select my-1"
            value={inputSalesAgent}
            onChange={(e) => setInputSalesAgent(e.target.value)}
          >
            <option disabled value={""}>
              Select Sales Agent
            </option>
            {agents.length > 0 &&
              agents.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <strong className="text-dark">Sort by:</strong>
        <div className="btn-group ms-3 my-2">
          <button
            onClick={() => setSortByPriority("High")}
            className="btn btn-outline-secondary"
          >
            High
          </button>

          <button
            onClick={() => setSortByPriority("Medium")}
            className="btn btn-outline-secondary"
          >
            Medium
          </button>

          <button
            onClick={() => setSortByPriority("Low")}
            className="btn btn-outline-secondary"
          >
            Low
          </button>

          <button
            onClick={() => setSortByTimeToClosed(true)}
            className="btn btn-outline-secondary"
          >
            Time to Close
          </button>
        </div>
        <button
          onClick={() => {
            setLeadStatus("");
            setInputSalesAgent("");
            setSortByPriority("");
            setSortByTimeToClosed(false);
          }}
          className="btn btn-danger ms-3 my-2"
        >
          Clear Filters
        </button>
      </div>

      <div className="text-center mt-4">
        <Link to={"/addLead"} className="btn btn-lg btn-secondary w-50">
          Add New Lead
        </Link>
      </div>
    </div>
  );
};

export default Leads;
