import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { post } from "../apiMethods";
import { notificationDispatcher } from "../utilityFunctions";
import "./Profile.css";
function Profile() {
  let dispatch = useDispatch();
  let {
    user: { _id, token },
  } = useSelector((state) => state.user);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    async function getProfile() {
      try {
        let body = JSON.stringify({ _id });
        let { data: { profile = {} } = {} } = await post({
          path: "/api/v1/user/profile",
          body,
          token,
        });
        setProfile(profile);
      } catch (error) {
        const {
          data: { message = "Something Wrong!!" },
          status,
        } = error.response || {};
        let notificationData = { message, status };
        notificationDispatcher(dispatch, notificationData);
      }
    }
    getProfile();
  }, []);

  const { user: { name, email } = {} } = profile || {};
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        maxHeight: "86.2vh",
        overflow: "auto",
      }}
    >
      <div className="Profile">
        <div className="CoverImage">
          {/* <span>
              <h2>Follow</h2>
            </span> */}
          <div className="lineHeight title">
            <h1>{name}</h1>
            <sub>
              <p>{email}</p>
            </sub>
          </div>
          <button
            className="buttonText"
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              lineHeight: 0,
              borderRadius: 20,
            }}
            title="Edit Profile"
            onClick={() => navigate(pathname + "/edit")}
          >
            {/* <h4>Edit</h4> */}
            <img src="/EditIcons.png" />
          </button>
        </div>
        <div className="About">
          <div className="flexColumn" style={{ padding: 20, minWidth: 500 }}>
            <img src="/ProfileImage.jpg" width="100%" />
          </div>
          <div className="flexColumn" style={{}}>
            <h2>About</h2>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
