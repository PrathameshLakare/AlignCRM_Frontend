import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalesAgents } from "../features/agent/agentSlice";
import { fetchTagsData } from "../features/tag/tagSlice";
import { postLeads, updateLeads } from "../features/lead/leadSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";

const LeadForm = () => {
  const dispatch = useDispatch();
  const { agents } = useSelector((state) => state.agent);
  const { tags } = useSelector((state) => state.tag);
  const { status, error } = useSelector((state) => state.lead);
  const location = useLocation();
  const stateLeadData = location.state;

  const [leadName, setLeadName] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [salesAgent, setSalesAgent] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [timeToClose, setTimeToClose] = useState("");
  const [priority, setPriority] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlertMessage, setShowAlertMessage] = useState(false);

  useEffect(() => {
    dispatch(fetchSalesAgents());
    dispatch(fetchTagsData());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      setShowAlertMessage(true);
      setTimeout(() => setShowAlertMessage(false), 5000);

      setLeadName("");
      setLeadSource("");
      setSalesAgent("");
      setLeadStatus("");
      setSelectedTags([]);
      setTimeToClose("");
      setPriority("");
    }
  }, [status]);

  useEffect(() => {
    if (stateLeadData) {
      setLeadName(stateLeadData.name || "");
      setLeadSource(stateLeadData.source || "");
      setSalesAgent(stateLeadData.salesAgent || "");
      setLeadStatus(stateLeadData.status || "");
      setSelectedTags(stateLeadData.tags || []);
      setTimeToClose(stateLeadData.timeToClose || "");
      setPriority(stateLeadData.priority || "");
    }
  }, [stateLeadData]);

  const handleTagChange = (tagName) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tagName)
        ? prevTags.filter((tag) => tag !== tagName)
        : [...prevTags, tagName]
    );
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const leadData = {
      name: leadName,
      source: leadSource,
      salesAgent,
      status: leadStatus,
      tags: selectedTags,
      timeToClose,
      priority,
    };

    if (
      leadName &&
      leadSource &&
      salesAgent &&
      leadStatus &&
      timeToClose &&
      priority
    ) {
      if (stateLeadData) {
        dispatch(updateLeads({ id: stateLeadData._id, lead: leadData }));
        setAlertMessage("Lead updated successfully!");
      } else {
        dispatch(postLeads(leadData));
        setAlertMessage("Lead added successfully!");
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="container my-4 bg-white p-4 shadow rounded">
          <h1 className="text-center text-dark mb-4">Add New Lead</h1>
          <hr />

          {status === "loading" && <p className="text-center">Loading...</p>}
          {status === "error" && (
            <p className="text-center text-danger">Error: {error}</p>
          )}

          {showAlertMessage && (
            <p className="text-center alert alert-success">{alertMessage}</p>
          )}

          <form onSubmit={handleSubmitForm} className="row g-3">
            <div className="col-md-6">
              <label htmlFor="leadName" className="form-label">
                Lead Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="leadName"
                placeholder="Enter lead name"
                value={leadName}
                required
                onChange={(e) => setLeadName(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="leadSource" className="form-label">
                Lead Source:
              </label>
              <select
                className="form-select"
                id="leadSource"
                value={leadSource}
                required
                onChange={(e) => setLeadSource(e.target.value)}
              >
                <option disabled value={""}>
                  Select Source
                </option>
                <option value={"Website"}>Website</option>
                <option value={"Referral"}>Referral</option>
                <option value={"Cold Call"}>Cold Call</option>
                <option value={"Advertisement"}>Advertisement</option>
                <option value={"Email"}>Email</option>
                <option value={"Other"}>Other</option>
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="salesAgent" className="form-label">
                Assigned Sales Agent:
              </label>
              <select
                className="form-select"
                id="salesAgent"
                value={salesAgent}
                required
                onChange={(e) => setSalesAgent(e.target.value)}
              >
                <option disabled value={""}>
                  Select Sales Agent
                </option>
                {agents.map((agent) => (
                  <option key={agent._id} value={agent._id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="leadStatus" className="form-label">
                Lead Status:
              </label>
              <select
                className="form-select"
                id="leadStatus"
                value={leadStatus}
                required
                onChange={(e) => setLeadStatus(e.target.value)}
              >
                <option disabled value={""}>
                  Select Status
                </option>
                <option value={"New"}>New</option>
                <option value={"Contacted"}>Contacted</option>
                <option value={"Qualified"}>Qualified</option>
                <option value={"Proposal Sent"}>Proposal Sent</option>
                <option value={"Closed"}>Closed</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Tags (Optional):</label>
              <div className="d-flex flex-wrap">
                {tags.map((tag) => (
                  <div
                    key={tag._id}
                    className="form-check form-check-inline me-3 mb-3"
                  >
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={tag._id}
                      value={tag._id}
                      checked={selectedTags.includes(tag.name)}
                      onChange={() => handleTagChange(tag.name)}
                    />
                    <label className="form-check-label" htmlFor={tag._id}>
                      {tag.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="timeToClose" className="form-label">
                Time to Close (days):
              </label>
              <input
                type="number"
                className="form-control"
                id="timeToClose"
                placeholder="Enter time in days"
                value={timeToClose}
                required
                onChange={(e) => setTimeToClose(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="priority" className="form-label">
                Priority:
              </label>
              <select
                className="form-select"
                id="priority"
                value={priority}
                required
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value={""} disabled>
                  Select Priority
                </option>
                <option value={"High"}>High</option>
                <option value={"Medium"}>Medium</option>
                <option value={"Low"}>Low</option>
              </select>
            </div>

            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary w-50">
                {stateLeadData ? "Update Lead" : "Save Lead"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;
