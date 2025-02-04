import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.REACT_APP_SERVER_URL;

export const fetchSalesAgents = createAsyncThunk("fetch/agents", async () => {
  const response = await axios.get(`${url}/agents`);

  return response.data;
});

export const postSalesAgents = createAsyncThunk(
  "post/agents",
  async (newAgent, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/agents`, newAgent);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Something went wrong"
      );
    }
  }
);

const agentSlice = createSlice({
  name: "agent",
  initialState: {
    agents: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSalesAgents.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSalesAgents.fulfilled, (state, action) => {
      state.status = "success";
      state.agents = action.payload.agents;
    });
    builder.addCase(fetchSalesAgents.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(postSalesAgents.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(postSalesAgents.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.agents.push(action.payload.agent);
    });
    builder.addCase(postSalesAgents.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default agentSlice.reducer;
