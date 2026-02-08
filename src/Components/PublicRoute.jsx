import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import FullPageSpinner from "./FullPageSpinner";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <FullPageSpinner />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace></Navigate>;
  }

  return children;
};

export default PublicRoute;
