/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem("authToken");
  const userType = localStorage.getItem("userType");

  if (!token || !allowedRoles.includes(userType)) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
