import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  user: null,
  isLogedIn: false,
  user_id: null,
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

      const res = await axios.post("/user/login", data, {
        "Content-Type": "application/json",
        withCredentials: true,
      });

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
      state.user_id = null;
      state.isLogedIn = false;
    },
  },

  extraReducers: {
    [userLogin.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSucess = true;
      state.user = payload.user;
      state.isLogedIn = true;
      state.user_id = payload._id;
      return;
    },

    [userLogin.pending]: (state) => {
      state.isLoading = true;
    },

    [userLogin.rejected]: (state, { payload }) => {
      state.error = payload.message;
      state.isLoading = false;

      if (state.error != null) {
        return toast.error(payload.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
      }
    },
  },
});

export default AuthSlice.reducer;
export const { logout } = AuthSlice.actions;
