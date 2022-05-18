import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router";
import "./HorizontalNavigation.css";
import { useDispatch, useSelector } from "react-redux";
import { getNavigationRoutes } from "../store/navigationSlice";
import Loading from "../Error/Loading";
function HorizontalNavigation() {
  const [showNavigation] = useState(true);
  const { navigation, auth: { user: { token } = {} } = {} } = useSelector(
    (state) => {
      return { navigation: state.navigation, auth: state.user };
    }
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNavigationRoutes(token));
    // eslint-disable-next-line
  }, [token]);

  // const dummy = [
  //   { to: "notes", text: "Notes" },
  //   { to: "pages", text: "Diary" },
  //   { to: "todos", text: "ToDos" },
  // ];
  let { routes = [] } = navigation || {};
  let dummy = routes.map(({ name, value }) => {
    return { to: value, text: name };
  });
  let inactiveStyle = {
    position: "relative",
    left: -150,
    top: 0,
  };
  if(!dummy || !dummy.length){
    return <Loading/>
  }
  return (
    <div style={{ display: "flex" }}>
      <div
        className="horizontalNavigation"
        style={showNavigation ? {} : inactiveStyle}
      >
        <div className="heading">
          <h3>Navigation</h3>
          {/* <div
            style={{ padding: 10, marginRight: 10, cursor: "pointer" }}
            onClick={() => setShowNavigation(!showNavigation)}
          >
            <h3>{showNavigation ? "<" : ">"}</h3>
          </div> */}
        </div>
        {dummy.map(({ to, text }, index) => {
          return (
            <NavLink
              key={index}
              to={to}
              className="Link"
              style={({ isActive }) => {
                let activeStyle = isActive
                  ? { backgroundColor: "rgba(214, 191, 203, 0.699)" }
                  : {};
                return {
                  ...activeStyle,
                };
              }}
            >
              <div
                style={{
                  paddingLeft: 20,
                  borderBottom: "1px solid rgba(214, 191, 203, 0.699)",
                }}
              >
                <h3>{text}</h3>
              </div>
            </NavLink>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
}

export default HorizontalNavigation;
