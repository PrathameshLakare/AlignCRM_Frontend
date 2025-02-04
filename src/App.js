import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LeadForm from "./pages/LeadForm";
import LeadManagement from "./pages/LeadManagement";
import LeadsDashboard from "./pages/LeadsDashboard";
import Leads from "./pages/Leads";
import Agents from "./pages/Agents";
import AgentForm from "./pages/AgentForm";
import Report from "./pages/Report";

function App() {
  return (
    <div>
      <Router>
        <div className="row">
          <div className="col-lg-2">
            <Sidebar />
          </div>
          <div className="col-lg-10 mt-lg-5">
            <Routes>
              <Route path="/" element={<LeadsDashboard />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/addLead" element={<LeadForm />} />
              <Route path="/leadDetails/:leadId" element={<LeadManagement />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/addAgent" element={<AgentForm />} />
              <Route path="/reports" element={<Report />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
