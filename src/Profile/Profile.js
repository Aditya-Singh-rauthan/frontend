import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../apiMethods";
import { notificationDispatcher } from "../utilityFunctions";
import "./Profile.css";
function Profile() {
  let dispatch = useDispatch();
  let {
    user: { _id, token },
  } = useSelector((state) => state.user);
  const [profile, setProfile] = useState({});
  useEffect(() => {
    async function getProfile() {
      try {
        let body = JSON.stringify({ _id });
        let profile = await post({ path: "/api/v1/user/profile", body, token });
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

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        maxHeight: "85.5vh",
        overflow: "auto",
      }}
    >
      <div className="Profile">
        <div className="CoverImage">
            {/* <span>
              <h2>Follow</h2>
            </span> */}
          <span style={{position:'absolute',bottom:10,right:10,padding:'0px 20px',backdropFilter:'blur(5px)',backgroundColor:'rgba(0, 128, 0, 0.493)',lineHeight:0,borderRadius:'20%'}}>
            <h4>Edit</h4>
          </span>
        </div>
        <div className="About">
          <div className="flexColumn" style={{}}>
            Image
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
              purpose (injected humour and the like). It is a long established
              fact that a reader will be distracted by the readable content of a
              page when looking at its layout. The point of using Lorem Ipsum is
              that it has a more-or-less normal distribution of letters, as
              opposed to using 'Content here, content here', making it look like
              readable English. Many desktop publishing packages and web page
              editors now use Lorem Ipsum as their default model text, and a
              search for 'lorem ipsum' will uncover many web sites still in
              their infancy. Various versions have evolved over the years,
              sometimes by accident, sometimes on purpose (injected humour and
              the like). It is a long established fact that a reader will be
              distracted by the readable content of a page when looking at its
              layout. The point of using Lorem Ipsum is that it has a
              more-or-less normal distribution of letters, as opposed to using
              'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like). It
              is a long established fact that a reader will be distracted by the
              readable content of a page when looking at its layout. The point
              of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like). It is a long established
              fact that a reader will be distracted by the readable content of a
              page when looking at its layout. The point of using Lorem Ipsum is
              that it has a more-or-less normal distribution of letters, as
              opposed to using 'Content here, content here', making it look like
              readable English. Many desktop publishing packages and web page
              editors now use Lorem Ipsum as their default model text, and a
              search for 'lorem ipsum' will uncover many web sites still in
              their infancy. Various versions have evolved over the years,
              sometimes by accident, sometimes on purpose (injected humour and
              the like).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
