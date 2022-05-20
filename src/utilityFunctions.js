import { v1 as uuid } from "uuid";
import { post } from "./apiMethods";
import { addNotification, removeNotification } from "./store/notificationSlice";
import { add, setLoading } from "./store/userSlice";

export const validateEmail = (email) => {
  return email.match(
    // eslint-disable-next-line
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const notificationDispatcher = (dispatch, data) => {
  const id = uuid();
  dispatch(addNotification({ ...data, id }));
  setTimeout(() => {
    dispatch(removeNotification(id));
  }, 3000);
};

export const checkUser = async (dispatch, navigate, pathname) => {
  let token = localStorage.getItem("token");
  dispatch(setLoading(true));
  if (token) {
    let body = JSON.stringify({ token });
    try {
      let result = await post({ path: "/api/v1/user/user", body });
      let {
        data: { user },
      } = result || {};
      dispatch(add({ ...user, token }));
      navigate(pathname);
      dispatch(setLoading(false));
    } catch (error) {
      const {
        data: { message = "Authentication Failed!!" },
        status,
      } = error.response || {};
      // navigate("/login");
      localStorage.removeItem("token");
      let notificationData = { message, status };
      notificationDispatcher(dispatch, notificationData);
      dispatch(setLoading(false));
    }
  }
  if (!token) {
    navigate("/login");
    dispatch(setLoading(false));
  }
};

export function checkConnectivity(dispatch, event) {
  console.log(">>>called");
  if (!navigator.onLine) {
    notificationDispatcher(dispatch, {
      message: "Not Connected To Internet!!!",
      status: "Error",
    });
  } else if (navigator.onLine) {
    notificationDispatcher(dispatch, {
      message: "Connection Established",
      status: "Success",
    });
  }
}

export const fileUrlCreator = (file) => {
  const url = URL.createObjectURL(file);
  return url;
};
