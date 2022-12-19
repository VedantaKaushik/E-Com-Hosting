import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: null,
  sucess: false,
  product: null,
  productLength: 0,
  sq: "",
};

// Search Thunk
export const searchApi = createAsyncThunk(
  "/api/search",
  async ({ q, limit, page }, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://voltssr.onrender.com/api/search?q=${q}&limit=${limit}&page=${page}`
      );
      return res.data;
    } catch (error) {
      console.log(error.response.data, error.response.status);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const featureSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    getQuery: (state, action) => {
      state.sq = action.payload;
    },

    resetState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.sucess = false;
      state.product = null;
      state.sq = "";
      return;
    },
  },

  extraReducers: {
    [searchApi.pending]: (state) => {
      state.isLoading = true;
      state.sucess = false;
      return;
    },

    [searchApi.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.sucess = true;
      state.error = null;
      state.product = payload.result;
      state.productLength = payload.ResultLen;
      return;
    },

    [searchApi.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      state.sucess = false;
      state.product = null;

      return;
    },
  },
});

export default featureSlice.reducer;
export const { getQuery, resetState } = featureSlice.actions;
