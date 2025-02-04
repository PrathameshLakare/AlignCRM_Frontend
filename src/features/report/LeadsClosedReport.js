import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPipelineData } from "./reportSlice";

ChartJS.register(ArcElement, Legend, Title);

const LeadsClosedReport = ({ leads }) => {
  const dispatch = useDispatch();
  const { pipeline } = useSelector((state) => state.report);
  const closedLeads = leads?.filter((lead) => lead.status === "Closed");

  useEffect(() => {
    dispatch(fetchPipelineData());
  }, [dispatch]);

  const chartData = {
    labels: ["Total Leads Pipeline", "Total Leads closed"],
    datasets: [
      {
        label: "Leads Overview",
        data: [pipeline?.totalLeadsInPipeline, closedLeads.length],
        backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(54, 162, 235, 0.5)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(54, 162, 235, 1)"],
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
    <div className="col-md-12 my-4">
      <div className="card bg-light text-dark p-3 border-0 shadow">
        <h3 className="card-title text-center">
          Total Leads closed and Leads in Pipeline:
        </h3>
        <div style={{ position: "relative", height: "350px" }}>
          <Pie data={chartData} options={chartOptions} className="w-100 m-1" />
        </div>
      </div>
    </div>
  );
};

export default LeadsClosedReport;
