import { configureStore } from "@reduxjs/toolkit";
import leadSlice from "../features/lead/leadSlice";
import agentSlice from "../features/agent/agentSlice";
import tagSlice from "../features/tag/tagSlice";
import commentSlice from "../features/comment/commentSlice";
import reportSlice from "../features/report/reportSlice";

export default configureStore({
  reducer: {
    lead: leadSlice,
    agent: agentSlice,
    tag: tagSlice,
    comment: commentSlice,
    report: reportSlice,
  },
});
