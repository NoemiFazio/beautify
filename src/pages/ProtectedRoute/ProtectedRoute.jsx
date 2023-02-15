// import styles from "./index.module.scss";
import { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router";
import styles from "./index.module.scss";

const ProtectedRoute = ({ user, children }) => {
  if (!localStorage.getItem("username") || !localStorage.getItem("email")) {
    return <Navigate to="/" />;
  }
  return children;
};

export default memo(ProtectedRoute);
