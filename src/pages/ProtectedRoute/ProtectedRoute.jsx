import { memo } from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ user, children }) => {
  if (!localStorage.getItem("username") || !localStorage.getItem("email")) {
    return <Navigate to="/" />;
  }
  return children;
};

export default memo(ProtectedRoute);
