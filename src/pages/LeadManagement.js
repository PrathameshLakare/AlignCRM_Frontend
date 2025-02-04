import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchLeadById } from "../features/lead/leadSlice";
import LeadDetails from "../components/LeadDetails";

const LeadManagement = () => {
  const dispatch = useDispatch();
  const { leadId } = useParams();
  const { leadDetails, status, error } = useSelector((state) => state.lead);

  useEffect(() => {
    dispatch(fetchLeadById(leadId));
  }, [dispatch, leadId]);

  return (
    <div className="container mt-4">
      {status === "loading" && <p className="text-center">Loading...</p>}

      {error && <div className="alert alert-danger">{error}</div>}

      {leadDetails ? (
        <LeadDetails lead={leadDetails} />
      ) : (
        !error && (
          <div className="alert alert-warning">Lead details not available</div>
        )
      )}
    </div>
  );
};

export default LeadManagement;
