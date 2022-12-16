import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ role, acceptRole }) {
  return role === acceptRole ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
