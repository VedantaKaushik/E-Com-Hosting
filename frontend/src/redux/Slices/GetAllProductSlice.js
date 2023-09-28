import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  productLength: 0,
  isLoading: false,
  error: null,
};

//
export const GetAllProducts = createAsyncThunk(
  "/api/products",
  async ({ page, limit, select }, thunkApi) => {
    try {
      const res = await axios.get(
        `/api/products?limit=${limit}&page=${page}&sort=${select}`
      );

      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const AllProductSlice = createSlice({
  name: "allProducts",
  initialState,
  reducers: {},
  extraReducers: {
    [GetAllProducts.pending]: (state) => {
      state.products = [];
      state.productLength = 0;
      state.isLoading = true;
      state.error = null;
      return;
    },
    [GetAllProducts.fulfilled]: (state, { payload }) => {
      state.products = payload.products;
      state.isLoading = false;
      state.productLength = payload.productLength;
      state.error = null;
      return;
    },
    [GetAllProducts.rejected]: (state, payload) => {
      state.products = [];
      state.productLength = 0;
      state.isLoading = false;
      state.error = payload;
      return;
    },
  },
});

export default AllProductSlice.reducer;
