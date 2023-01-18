import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import CartSlice from "./Slices/CartSlice";
import AuthSlice from "./Slices/AuthSlice";
import FeatureSlice from "./Slices/FeatureSlice";
import UpdateSlice from "./Slices/UpdateSlice";
import GetAllProductSlice from "./Slices/GetAllProductSlice";
import CatagorySlice from "./Slices/CatagorySlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storageSession,
};

const rootReducer = combineReducers({
  cart: CartSlice,
  auth: AuthSlice,
  features: FeatureSlice,
  update: UpdateSlice,
  allProducts: GetAllProductSlice,
  catagory: CatagorySlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

//
export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: false,
});
