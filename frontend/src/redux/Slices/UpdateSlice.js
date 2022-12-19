import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  AdressLine: "",
  city: "",
  state: "",
  zipCode: "",
  phone: "",
  country: "Country",
};

// Update
export const UpdateAddress = createAsyncThunk(
  "/api/user",
  async (
    { AdressLine, city, state, zipCode, phone, country, id },
    thunkAPI
  ) => {
    try {
      const data = { AdressLine, city, state, zipCode, phone, country, id };

      const res = await axios.post(
        "http://localhost:5000/api/user/update",
        data,
        {
          "Content-Type": "application/json",
        }
      );

      const UpdateDetail = async () => {
        const Detail = await axios.get(
          "http://localhost:5000/api/user/getinfo",
          {
            withCredentials: true,
          }
        );

        // Deleting User Detail
        sessionStorage.removeItem("user");
        sessionStorage.setItem("user", JSON.stringify(Detail.data));
      };

      if (res.status === 200) {
        UpdateDetail();
      }

      return res.data;
    } catch (error) {
      console.log(error.response.data, error.response.status);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const UpdateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    getInfo: (state) => {
      const User = sessionStorage.getItem("user");
      let UserDeatil = JSON.parse(User);

      state.AdressLine = UserDeatil.AdressLine;
      state.city = UserDeatil.city;
      state.state = UserDeatil.state;
      state.zipCode = UserDeatil.zipCode;
      state.phone = UserDeatil.phone;
      state.country = UserDeatil.phone;
    },
  },
  extraReducers: {
    [UpdateAddress.fulfilled]: (state, { payload }) => {
      state.AdressLine = payload.userAdress.AdressLine;
      state.city = payload.userAdress.city;
      state.state = payload.userAdress.state;
      state.zipCode = payload.userAdress.zipCode;
      state.phone = payload.userAdress.phone;
      state.country = payload.userAdress.phone;

      return toast("Address Updated", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: 1,
      });
    },

    [UpdateAddress.error]: (state, { payload }) => {
      state.error = payload;
      return toast(payload, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: 1,
      });
    },
  },
});

export default UpdateSlice.reducer;
export const { getInfo } = UpdateSlice.actions;
