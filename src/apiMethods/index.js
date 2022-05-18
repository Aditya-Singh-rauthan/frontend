import axios from "axios";

const baseUrl = "http://localhost:5001";
export const post = async ({ path, body, token }) => {
  // console.log(">>>>baseUrl + path", baseUrl + path);
  try {
    return await axios.post(baseUrl + path, body, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // console.log(">>>error",error);
    throw error;
  }
};
