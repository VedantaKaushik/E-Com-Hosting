import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ user, childern }) => {
  const location = useLocation();

  if (user == null) {
    <Navigate to="/login" state={{ from: location }} replace />;
  }
  return childern;
};

export default PrivateRoutes;
