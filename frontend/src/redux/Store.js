import { configureStore, combineReducers } from "@reduxjs/toolkit";
import CartSlice from "./Slices/CartSlice";
import AuthSlice from "./Slices/AuthSlice";
import FeatureSlice from "./Slices/FeatureSlice";
import UpdateSlice from "./Slices/UpdateSlice";
import GetAllProductSlice from "./Slices/GetAllProductSlice";
import CatagorySlice from "./Slices/CatagorySlice";

const rootReducer = combineReducers({
  cart: CartSlice,
  auth: AuthSlice,
  features: FeatureSlice,
  update: UpdateSlice,
  allProducts: GetAllProductSlice,
  catagory: CatagorySlice,
});

//
export const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
