import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.REACT_APP_SERVER_URL;

export const fetchPipelineData = createAsyncThunk(
  "fetch/pipeline",
  async () => {
    const response = await axios.get(`${url}/report/pipeline`);
    return response.data;
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState: {
    pipeline: null,
    error: null,
    status: "idle",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPipelineData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPipelineData.fulfilled, (state, action) => {
      state.status = "success";
      state.pipeline = action.payload;
    });
    builder.addCase(fetchPipelineData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default reportSlice.reducer;
