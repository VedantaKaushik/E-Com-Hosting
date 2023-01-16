import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Account from "./Account";

const PrivateRoutes = ({ user }) => {
  const location = useLocation();
  console.log(location);

  return user === null ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Account />
  );
};

export default PrivateRoutes;
