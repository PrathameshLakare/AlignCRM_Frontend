import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSalesAgents } from "../agent/agentSlice";

ChartJS.register(
  ArcElement,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement
);

const LeadsClosedByAgents = ({ leads }) => {
  const dispatch = useDispatch();
  const { agents } = useSelector((state) => state.agent);

  const leadsByAgentsArray =
    agents?.map((agent) => ({
      agentName: agent.name,
      leadCount: leads.filter(
        (lead) => lead.salesAgent._id === agent._id && lead.status === "Closed"
      ).length,
    })) || [];

  const agentNames = [
    ...leadsByAgentsArray.map((item) => item.agentName),
    "Total closed leads",
  ];
  const leadCounts = [
    ...leadsByAgentsArray.map((item) => item.leadCount),
    leads?.filter((lead) => lead.status === "Closed").length,
  ];

  useEffect(() => {
    dispatch(fetchSalesAgents());
  }, [dispatch]);

  const chartData = {
    labels: agentNames,
    datasets: [
      {
        label: "Leads Overview",
        data: leadCounts,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Leads Closed Report",
      },
    },
  };

  return (
    <div className="col-md-12 mb-4">
      <div className="card bg-light text-dark p-3 border-0 shadow">
        <h3 className="card-title text-center">Leads Closed by Sales Agent:</h3>
        <div style={{ position: "relative", height: "350px" }}>
          <Bar
            data={chartData}
            options={chartOptions}
            className="mx-auto w-100 py-3"
          />
        </div>
      </div>
    </div>
  );
};

export default LeadsClosedByAgents;
