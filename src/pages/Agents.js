import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalesAgents } from "../features/agent/agentSlice";
import { Link } from "react-router-dom";

const Agents = () => {
  const dispatch = useDispatch();
  const { agents } = useSelector((state) => state.agent);

  useEffect(() => {
    dispatch(fetchSalesAgents());
  }, [dispatch]);

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0">
        <div className="card-body">
          <h2 className="text-center text-dark mb-4">Sales Agents</h2>
          <hr />

          <div>
            <h4 className="text-dark mb-3">Agent List</h4>
            {agents.length > 0 ? (
              <ul className="list-group">
                {agents.map((agent) => (
                  <li
                    key={agent._id}
                    className="list-group-item d-flex justify-content-between align-items-center bg-light"
                  >
                    <div>
                      <strong className="text-dark">{agent.name}</strong>
                      <br />
                      <span className="text-muted">{agent.email}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="border rounded p-4 text-center text-muted bg-light">
                No agents available. Add a new agent to get started.
              </div>
            )}
          </div>

          <div className="text-center mt-4">
            <Link to="/addAgent" className="btn btn-secondary btn-lg w-50">
              Add New Agent
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agents;
