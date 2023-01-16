import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Account from "../components/Account";

const PrivateRoutes = ({ user, childern }) => {
  const location = useLocation();

  return user !== null ? (
    <Account />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
