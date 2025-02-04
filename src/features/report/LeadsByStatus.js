import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title, Legend, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Legend, Title, Tooltip);

const LeadsByStatus = ({ leads = [] }) => {
  const leadsStatus = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Closed",
  ];

  const leadsCount = leadsStatus.map(
    (status) => leads.filter((lead) => lead.status === status).length
  );

  const chartData = {
    labels: leadsStatus,
    datasets: [
      {
        label: "Leads Overview",
        data: leadsCount,
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
        ],
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
        text: "Total Leads Per Status Report",
      },
    },
  };

  return (
    <div className="col-md-12 mb-4">
      <div className="card bg-light text-dark p-3 border-0 shadow">
        <h3 className="card-title text-center">Leads Per Status:</h3>
        <div style={{ position: "relative", height: "350px" }}>
          <Pie data={chartData} options={chartOptions} className="w-100 m-1" />
        </div>
      </div>
    </div>
  );
};

export default LeadsByStatus;
