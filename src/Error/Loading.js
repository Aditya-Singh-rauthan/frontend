import React from "react";
import { useSelector } from "react-redux";

function Loading() {
  const { loading = false } = useSelector((state) => state.user);
  return (
    <div className="loading" style={{ display: loading ? "flex" : "none" }}>
      <h2>Loading</h2>
    </div>
  );
}

export default Loading;
