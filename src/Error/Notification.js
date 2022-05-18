import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeNotification } from "../store/notificationSlice";
import "./Error.css";
function Notification() {
  const notifications = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  return (
    <div
      className="Notification"
      style={{ display: notifications.length ? "flex" : "none" }}
    >
      {notifications.map(({ message, status, id }, index) => {
        return (
          <div
            key={index}
            className="notificationContainer"
            style={{
              backgroundColor:
                status === 200 || status !== "Error"
                  ? "rgba(85, 243, 53, 0.548)"
                  : "rgba(248, 82, 82, 0.548)",
            }}
          >
            <p>{message}</p>
            <div onClick={() => dispatch(removeNotification(id))}>
              <h4>X</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Notification;
