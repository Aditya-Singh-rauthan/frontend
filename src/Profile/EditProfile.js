import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../apiMethods";
import Loading from "../Error/Loading";
import Form from "../Form/Form";
import Upload from "../Upload/Upload";
import { notificationDispatcher } from "../utilityFunctions";
import "./Profile.css";
function EditProfile() {
  let dispatch = useDispatch();
  let {
    user: { _id, token },
  } = useSelector((state) => state.user);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const onSaveUser = async (data) => {
    setLoading(true);
    try {
      let postresult = await post({
        path: "/postdata/",
        body: { model: "User", record: { _id: data._id }, updates: data },
        token,
      });
      setProfile({ ...profile, user: data });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const {
        data: { message = "Something Wrong!!" },
        status,
      } = error.response || {};
      let notificationData = { message, status };
      notificationDispatcher(dispatch, notificationData);
    }
  };
  const onSaveProfile = async (data) => {
    setLoading(true);
    try {
      let postresult = await post({
        path: "/postdata/",
        body: { model: "Profile", record: { _id: data._id }, updates: data },
        token,
      });
      setProfile({ ...profile, ...data });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const {
        data: { message = "Something Wrong!!" },
      } = error.response || {};
      let notificationData = { message, status: "Error" };
      notificationDispatcher(dispatch, notificationData);
    }
  };
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
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
  // let fields = getNestedFields(rest);
  let { user, profile_pic, ...fields } = profile || {};

  fields = { ...fields, url: profile_pic.url };

  let { profile_pic: { url } = {} } = profile || {};
  if (loading) {
    return (
      <div
        className="flexRow"
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        maxHeight: "86.8vh",
        overflow: "auto",
      }}
    >
      <div className="flexRow ProfileImage">
        <img src={url} width="100%" height="100%" />
        <div
          className="buttonText"
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            lineHeight: 0,
            borderRadius: 20,
          }}
          title="Upload Profile Pic"
        >
          <Upload
            uploadType={"profile_pic"}
            profileId={profile._id}
            setValue={setProfile}
          />
        </div>
      </div>
      <div className="flexColumn">
        <Form
          data={profile.user || {}}
          title="Basic Info."
          onSave={onSaveUser}
        />
        <Form data={fields} title="Extra Info." onSave={onSaveProfile} />
      </div>
    </div>
  );
}

export default EditProfile;
