import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Account from "../components/Account";

const ProtectedRoutes = ({ isLogedIn }) => {
  const location = useLocation();

  return isLogedIn ? (
    <Account />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
