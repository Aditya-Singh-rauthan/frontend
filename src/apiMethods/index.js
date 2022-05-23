import axios from "axios";

const baseUrl = "http://localhost:5001";
export const post = async ({ path, body, token, upload, ...rest }) => {
  // console.log(">>>>baseUrl + path", baseUrl + path);
  let extraHeaders = {};
  if (upload) {
    extraHeaders = { accept: "multipart/form-data" };
  }
  try {
    return await axios.post(baseUrl + path, body, {
      headers: {
        Authorization: token,
        "Content-Type": upload ? "multipart/form-data" : "application/json",
        ...extraHeaders,
      },
      params: { ...rest },
    });
  } catch (error) {
    // console.log(">>>error",error);
    throw error;
  }
};
