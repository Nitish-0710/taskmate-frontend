import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { Nav } from "react-bootstrap";
import FullPageSpinner from "./FullPageSpinner";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <FullPageSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace></Navigate>;
  }

  return children;
};

export default ProtectedRoute;
