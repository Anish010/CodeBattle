import React from "react";
import { Navigate, Outlet} from "react-router-dom";
import Cookies from "js-cookie";
const PrivateRoutes = () => {
  let auth = Cookies.get("authToken");
  return (
    auth? <Outlet /> : <Navigate to="/" />
  )
};

export default PrivateRoutes;