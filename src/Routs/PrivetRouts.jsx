import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
// import { BallTriangle } from "react-loader-spinner";

const PrivetRouts = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <span className="loading loading-infinity loading-lg text-warning"></span>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate state={{ from: location }} replace to="/login"></Navigate>;
};
export default PrivetRouts;
