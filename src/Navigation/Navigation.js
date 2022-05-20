import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import Loading from "../Error/Loading";
import Modal from "../modal/modal";
import { logout } from "../store/userSlice";
import "./Navigation.css";
function Navigation() {
  let auth = useSelector((state) => state.user);
  const [logoutModal, setLogoutModal] = useState(false);
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
                let activeStyle = isActive ? { color: "red" } : {};
                return {
                  ...activeStyle,
                };
              }}
              to="profile"
              className="p1 Link"
            >
              <h3>Profile</h3>
            </NavLink>
            <div className="p1" onClick={() => setLogoutModal(true)}>
              <button className="buttonText"><h3>Logout</h3></button>
            </div>
            {logoutModal && (
              <Modal>
                <div className="flexRow logout">
                  <div className="flexRow">
                    <img src={"/Logout.jpg"} width="100%" height="100%" />
                  </div>
                  <div className="flexColumn">
                    <h1 style={{ color: "brown" }}>Logout !!!</h1>
                    <p>Confirm Logout? </p>
                    <div className="flexRow logoutButtons">
                      <button
                        className="redButton"
                        onClick={() => dispatch(logout(navigate))}
                      >
                        Confirm
                      </button>
                      <button
                        className="greenButton"
                        onClick={() => setLogoutModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        </div>
        <Outlet />
      </>
    );
  }
}

export default Navigation;
