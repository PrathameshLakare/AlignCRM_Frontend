import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.REACT_APP_SERVER_URL;

export const fetchTagsData = createAsyncThunk("fetch/tags", async () => {
  const response = await axios.get(`${url}/tags`);

  return response.data;
});

const tagSlice = createSlice({
  name: "tag",
  initialState: {
    tags: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTagsData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTagsData.fulfilled, (state, action) => {
      state.status = "success";
      state.tags = action.payload.tags;
    });
    builder.addCase(fetchTagsData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default tagSlice.reducer;
