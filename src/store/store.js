import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import notificationReducer from "./notificationSlice";
import navigationSlice from "./navigationSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    navigation: navigationSlice,
  },
});

export default store;
