import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.REACT_APP_SERVER_URL;

export const fetchLeads = createAsyncThunk("fetch/leads", async (query) => {
  const response = await axios.get(`${url}/leads`, { params: query });
  return response.data;
});

export const postLeads = createAsyncThunk("post/leads", async (lead) => {
  const response = await axios.post(`${url}/leads`, lead);
  return response.data;
});

export const updateLeads = createAsyncThunk(
  "update/leads",
  async ({ id, lead }) => {
    const response = await axios.put(`${url}/leads/${id}`, lead);
    return response.data;
  }
);

export const fetchLeadById = createAsyncThunk("fetch/lead/id", async (id) => {
  const response = await axios.get(`${url}/leads/${id}`);

  return response.data;
});

const leadSlice = createSlice({
  name: "lead",
  initialState: {
    leads: [],
    status: "idle",
    error: null,
    leadDetails: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLeads.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchLeads.fulfilled, (state, action) => {
      state.status = "success";
      state.leads = action.payload.leads;
    });
    builder.addCase(fetchLeads.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(postLeads.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(postLeads.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.leads.push(action.payload.lead);
    });
    builder.addCase(postLeads.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(fetchLeadById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchLeadById.fulfilled, (state, action) => {
      state.status = "success";
      state.leadDetails = action.payload.lead;
    });
    builder.addCase(fetchLeadById.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(updateLeads.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateLeads.fulfilled, (state, action) => {
      state.status = "succeeded";
      const index = state.leads.findIndex(
        (lead) => lead._id === action.payload.lead._id
      );
      state.leads[index] = action.payload.lead;
      state.leadDetails = action.payload.lead;
    });
    builder.addCase(updateLeads.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default leadSlice.reducer;
