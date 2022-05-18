import { createSlice } from "@reduxjs/toolkit";
import { post } from "../apiMethods";
import { notificationDispatcher } from "../utilityFunctions";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading(state, action) {
      return { ...state, loading: action.payload };
    },
    add(state, action) {
      return { ...state, user: action.payload };
    },
    otp(state, action) {
      return { ...state, otpSent: true, registerUser: action.payload };
    },
    removeOtp(state, action) {
      return { ...state, otpSent: false, registerUser: null };
    },
    remove(state, action) {
      state.user = null;
    },
  },
});

export const { add, remove, otp, removeOtp, setLoading } = userSlice.actions;
export default userSlice.reducer;

export function fetchOTP(data) {
  return async function apiCall(dispatch, getState) {
    let body = JSON.stringify(data);
    dispatch(setLoading(true));
    try {
      let result = await post({ path: "/api/v1/user/otp", body });
      let {
        data: { message = "OK!!!" },
        status,
      } = result || {};
      dispatch(otp(data));
      notificationDispatcher(dispatch, { message, status });
      dispatch(setLoading(false));
      setTimeout(() => {
        dispatch(removeOtp());
      }, 180000);
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
}
export function register(data, navigate) {
  return async function apiCall(dispatch, getState) {
    let body = JSON.stringify(data);
    dispatch(setLoading(true));
    try {
      let result = await post({ path: "/api/v1/user/register", body });
      let {
        data: { message = "OK!!!" },
        status,
      } = result || {};
      dispatch(removeOtp());
      // dispatch(add(data));
      notificationDispatcher(dispatch, { message, status });
      navigate("/login");
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
}
export const login = (data, navigate) => async (dispatch, getState) => {
  let body = JSON.stringify(data);
  dispatch(setLoading(true));
  try {
    let result = await post({ path: "/api/v1/user/login", body });
    let {
      data: { message = "OK!!!", token, user },
      status,
    } = result || {};
    dispatch(add({ ...user, token }));
    localStorage.setItem("token", token);
    notificationDispatcher(dispatch, { message, status });
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

export const logout = (navigate) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  try {
   
    dispatch(add({}));
    localStorage.removeItem("token");
    notificationDispatcher(dispatch, { message:"Logged Out!!!", status:'OK' });
    navigate('/login')
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
