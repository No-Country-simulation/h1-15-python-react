/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const ProtectedRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("authToken");
  return token ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
