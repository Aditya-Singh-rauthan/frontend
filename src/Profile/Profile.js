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

  // if(!profile || !profile._id){
  //   return <div><p>Loading</p></div>
  // }
  const {
    user: { name, email } = {},
    profile_pic: { url } = {},
    about = "",
    _id:profileId,
    ...rest
  } = profile || {};
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        maxHeight: "87.2vh",
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
            <img src="/EditIcons.png" />
          </button>
        </div>
        <div className="About">
          <div
            className="flexColumn"
            style={{
              padding: 20,
              alignItems: "center",
              position: "relative",
            }}
          >
            <img
              src={url || "/ProfileImage.jpg"}
              width="200"
              height="200"
              style={{
                borderRadius: "50%",
                left: "50%",
                position: "absolute",
                top: -100,
                border: "4px solid brown",
                transform: "translateX(-50%)",
              }}
            />
            <div
              className="flexColumn"
              style={{ position: "absolute", top: 120,padding:20 }}
            >
              {Object.keys(rest).map((item, index) => {
                return (
                  <div key={index}>
                    <b><p>{item} : {rest[item]}</p></b>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flexColumn" style={{}}>
            <h2>About</h2>
            <p>{about}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
