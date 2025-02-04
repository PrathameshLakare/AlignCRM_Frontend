import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSalesAgents } from "../features/agent/agentSlice";

const AgentForm = () => {
  const dispatch = useDispatch();
  const [agentName, setAgentName] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { status, error } = useSelector((state) => state.agent);

  useEffect(() => {
    if (status === "succeeded") {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);

      setAgentName("");
      setAgentEmail("");
    }
  }, [status]);

  const handleSubmitFormForAgent = (e) => {
    e.preventDefault();

    if (agentName && agentEmail) {
      const newAgent = { name: agentName, email: agentEmail };

      dispatch(postSalesAgents(newAgent));
      setSuccessMessage("Sales agent added successfully.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center ">
      <div className="card shadow-lg border-0 p-4 w-75 w-md-50 my-5">
        <h2 className="text-center text-dark mb-4">Create New Agent</h2>
        <hr />
        {status === "loading" && <p className="text-center">Loading...</p>}
        {status === "error" && (
          <p className="text-center text-danger">Error: {error}</p>
        )}

        {showSuccessMessage && (
          <p className="text-center alert alert-success">{successMessage}</p>
        )}

        <form onSubmit={handleSubmitFormForAgent}>
          <div className="mb-3">
            <label className="form-label">Agent Name:</label>
            <input
              type="text"
              placeholder="Agent Name"
              className="form-control"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address:</label>
            <input
              type="email"
              placeholder="example: test@email.com"
              className="form-control"
              value={agentEmail}
              onChange={(e) => setAgentEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-100">
            Create Agent
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgentForm;
