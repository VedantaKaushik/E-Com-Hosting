import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isSucess: false,
};

// Async thunk
export const userLogin = createAsyncThunk(
  "/user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = { email, password };

      const res = await axios.post(
        "https://voltssr.onrender.com/api/user/login",
        data,
        {
          "Content-Type": "application/json",
          withCredentials: true,
        }
      );

      // Saving Data In Sesion Storage
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      sessionStorage.setItem("isAdmin", res.data.isAdmin);
      sessionStorage.setItem("userId", res.data._id);

      return res.data;
    } catch (error) {
      // console.log(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },

  extraReducers: {
    [userLogin.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSucess = true;
      state.user = payload.user;
      state.token = payload.token;
      return;
    },

    [userLogin.pending]: (state) => {
      state.isLoading = true;
    },

    [userLogin.rejected]: (state, { payload }) => {
      state.error = payload.message;
      state.isLoading = false;
      return;
    },
  },
});

export default AuthSlice.reducer;
export const { logout } = AuthSlice.actions;
