import { createSlice } from "@reduxjs/toolkit";
import { post } from "../apiMethods";
import { notificationDispatcher } from "../utilityFunctions";
import { setLoading } from "./userSlice";

const initialState = {};

const navigationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNavigationRoutes(state, action) {
      return { ...state, routes: action.payload };
    },
    removeNavigationRoutes(state, action) {
      return { ...state, routes: [] };
    },
  },
});

export const { addNavigationRoutes, removeNavigationRoutes } =
  navigationSlice.actions;
export default navigationSlice.reducer;

export const getNavigationRoutes = (token) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(false));
    let result = await post({ path: "/api/v1//field/getallTypes", token });
    let {
      data: { types },
    } = result || {};
    dispatch(addNavigationRoutes(types));
    // notificationDispatcher(dispatch, { message, status });
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    const {
      data: { message = "Something Wrong!!" },
      status,
    } = error.response || {};
    let notificationData = { message, status };
    notificationDispatcher(dispatch, notificationData);
  }
};
