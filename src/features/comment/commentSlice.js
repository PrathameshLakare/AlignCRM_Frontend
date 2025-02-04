import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.REACT_APP_SERVER_URL;

export const fetchCommentsByLead = createAsyncThunk(
  "fetch/comments",
  async (id) => {
    const response = await axios.get(`${url}/leads/${id}/comments`);
    return response.data;
  }
);

export const postCommentByLead = createAsyncThunk(
  "post/comment",
  async ({ id, commentData }) => {
    const response = await axios.post(
      `${url}/leads/${id}/comments`,
      commentData
    );
    return response.data;
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCommentsByLead.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCommentsByLead.fulfilled, (state, action) => {
      state.status = "success";
      state.comments = action.payload.comments;
    });
    builder.addCase(fetchCommentsByLead.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(postCommentByLead.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(postCommentByLead.fulfilled, (state, action) => {
      state.status = "success";
      state.comments.push(action.payload.comment);
    });
    builder.addCase(postCommentByLead.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default commentSlice.reducer;
