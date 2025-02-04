import { useEffect, useState } from "react";
import { FaEdit, FaPaperPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommentsByLead,
  postCommentByLead,
} from "../features/comment/commentSlice";
import { Link } from "react-router-dom";

const LeadDetails = ({ lead }) => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);
  const [inputComment, setInputComment] = useState("");

  const clickHandlerForComment = () => {
    if (inputComment) {
      const commentData = {
        author: "679a0d6220ac3a5cb15ffb4c",
        commentText: inputComment,
      };

      dispatch(postCommentByLead({ id: lead?._id, commentData }));
      setInputComment("");
    }
  };

  useEffect(() => {
    dispatch(fetchCommentsByLead(lead?._id));
  }, [dispatch, lead]);

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4">
        <h1 className="text-center text-dark mb-4">
          Lead Management: {lead?.name}
        </h1>
        <div className="card-body">
          <h4 className="text-secondary">Lead Details</h4>
          <hr />
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Lead Name:</strong> {lead?.name}
            </li>
            <li className="list-group-item">
              <strong>Lead Agent:</strong> {lead?.salesAgent?.name}
            </li>
            <li className="list-group-item">
              <strong>Lead Source:</strong> {lead?.source}
            </li>
            <li className="list-group-item">
              <strong>Lead Status:</strong>
              <span
                className={`badge ms-2 ${
                  lead?.status === "Closed"
                    ? "bg-success"
                    : "bg-warning text-dark"
                }`}
              >
                {lead?.status}
              </span>
            </li>
            <li className="list-group-item">
              <strong>Priority:</strong>
              <span
                className={`badge ms-2 ${
                  lead?.priority === "High" ? "bg-danger" : "bg-info text-dark"
                }`}
              >
                {lead?.priority}
              </span>
            </li>

            {lead?.tags.length > 0 && (
              <li className="list-group-item">
                <strong>Tags:</strong>
                {lead?.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`badge ms-2 bg-secondary text-dark`}
                  >
                    {tag}
                  </span>
                ))}
              </li>
            )}

            <li className="list-group-item">
              <strong>Time to Close:</strong> {lead?.timeToClose} Days
            </li>
          </ul>

          <div className="text-center mt-4">
            <Link to={"/addLead"} state={lead} className="btn btn-primary">
              <FaEdit className="me-2" /> Edit Lead Details
            </Link>
          </div>

          <hr />

          <div className="card mt-4 shadow-sm">
            <div className="card-body">
              <h5 className="text-secondary">Comments Section</h5>
              <hr />
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className="mb-3">
                    <p>
                      <strong>Author:</strong> {comment.author.name}{" "}
                      <span className="text-muted">
                        [{new Date(comment.createdAt).toLocaleDateString()}]
                      </span>
                    </p>
                    <p>
                      <strong>Comment:</strong> {comment.commentText}
                    </p>
                    <hr />
                  </div>
                ))
              ) : (
                <div className="mb-3">
                  <p>No comments yet</p>
                </div>
              )}

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add a comment..."
                  value={inputComment}
                  onChange={(e) => setInputComment(e.target.value)}
                />
                <button
                  onClick={clickHandlerForComment}
                  className="btn btn-success"
                >
                  <FaPaperPlane className="me-2" /> Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
