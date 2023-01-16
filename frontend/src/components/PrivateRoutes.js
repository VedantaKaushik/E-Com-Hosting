import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = ({ user, childern }) => {
  const location = useLocation();

  return user !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
