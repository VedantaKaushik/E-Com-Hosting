import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  sucess: false,
  error: null,
  products: [],
  proLength: 0,
};

//
export const SearchCatagory = createAsyncThunk(
  "/api/products/catagory",
  async ({ catagory, page, limit, select }, thunkApi) => {
    try {
      const res = await axios.get(
        `/api/products/catagory?catagory=${catagory}&page=${page}&limit=${limit}&sort=${select}`
      );

      return res.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

const CatagorySlice = createSlice({
  name: "catagory",
  initialState,
  reducers: {},
  extraReducers: {
    [SearchCatagory.pending]: (state) => {
      state.isLoading = true;
      state.sucess = false;
      state.error = null;
      state.products = [];
      state.proLength = 0;
    },

    [SearchCatagory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.sucess = true;
      state.error = null;
      state.products = payload.product;
      state.proLength = payload.proLen;
    },

    [SearchCatagory.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.sucess = false;
      state.error = payload;
      state.products = [];
      state.proLength = 0;
    },
  },
});

export default CatagorySlice.reducer;
