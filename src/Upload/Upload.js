import React, { useEffect, useRef, useState } from "react";
import { fileUrlCreator } from "../utilityFunctions";

function Upload() {
  const [files, setFiles] = useState([]);
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

  return (
    <div>
      <input
        type="file"
        onChange={(e) => onFileSelect(e)}
        multiple={true}
        name="file"
        ref={inputRef}
        style={{ display: "none" }}
      />
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
          <img src="/Upload.png" width="100" height="100" />
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
    </div>
  );
}

export default Upload;
