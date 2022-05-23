import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../apiMethods";
import Modal from "../modal/modal";
import { fileUrlCreator, notificationDispatcher } from "../utilityFunctions";

function Upload(props) {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const { user: { token } = {} } = useSelector((state) => state.user);
  const inputRef = useRef(null);
  const onFileSelect = (e) => {
    setFiles([...files, ...e.target.files]);
  };
  const removeFile = (file) => {
    let removeFileName = file.name;
    let removeIndex;
    for (let i = 0; i < files.length; i++) {
      if (files[i].name === removeFileName) {
        removeIndex = i;
      }
    }
    files.splice(removeIndex, 1);
    setFiles([...files]);
  };
  const onSubmit = async () => {
    let formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }
    try {
      let { data } =
        (await post({
          path: "/upload",
          body: formData,
          token,
          upload: true,
          ...props,
        })) || {};
      notificationDispatcher(dispatch, data);
      setFiles([])
      props.setValue((value) => {
        return { ...value, profile_pic: data.result.profile_pic };
      });
    } catch (error) {
      notificationDispatcher(dispatch, error);
      setFiles([])
    }
  };
  return (
    <div>
      <form>
        <input
          type="file"
          onChange={(e) => onFileSelect(e)}
          multiple={true}
          name="file"
          ref={inputRef}
          style={{ display: "none" }}
        />
      </form>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: 10,
        }}
      >
        <div
          onClick={() => inputRef.current.click()}
          style={{ cursor: "pointer" }}
        >
          <img src="/UploadImage.png" />
        </div>
        {files.map((item, index) => {
          return (
            <div
              key={index}
              style={{ width: 100, height: 100, position: "relative" }}
            >
              <div
                style={{ position: "absolute", cursor: "pointer" }}
                onClick={() => removeFile(item)}
              >
                <img src={"/RemoveIcon.png"} width="30" height="30" />
              </div>
              <a href={fileUrlCreator(item)} target="_blank">
                <img src={fileUrlCreator(item)} width="100%" height="100%" />
              </a>
            </div>
          );
        })}
      </div>
      {files && files.length ? (
        <button className="greenButton" onClick={onSubmit}>
          Upload
        </button>
      ) : null}
    </div>
  );
}

export default Upload;
