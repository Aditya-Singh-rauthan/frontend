import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import Loading from "../Error/Loading";
import { logout } from "../store/userSlice";
import "./Navigation.css";
function Navigation() {
  let auth = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { user: { _id } = {} } = auth || {};

  if (_id) {
    return auth.loading ? (
      <Loading />
    ) : (
      <>
        <div className="navigation flexRow">
          <div className="flexRow">
            <h1>Notes Online</h1>
          </div>
          <div className="flexRow flexRowEnd">
            <div className="p1">
              <h3>Notification</h3>
            </div>
            <NavLink
              style={({ isActive }) => {
                let activeStyle = isActive
                  ? { color: "red" }
                  : {};
                return {
                  ...activeStyle,
                };
              }}
              to="profile"
              className="p1 Link"
            >
              <h3>Profile</h3>
            </NavLink>
            <div className="p1" onClick={() => dispatch(logout(navigate))}>
              <h3>Logout</h3>
            </div>
          </div>
        </div>
        <Outlet />
      </>
    );
  }
}

export default Navigation;
