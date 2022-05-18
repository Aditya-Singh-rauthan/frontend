import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

function PublicRoute(props) {
  const auth = useSelector((state) => state.user);
  let { user: { _id } = {} } = auth || {};
  let location = useLocation()
  if (!_id) {
    return props.children;
  }
  
  console.log('>>>props',location)
  let {pathname} = location || {}
  return <Navigate to="/home" />;
}

export default PublicRoute;
