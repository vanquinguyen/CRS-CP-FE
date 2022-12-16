import { PAGE_URLS } from "../constants";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ id }) {
  return id ? <Outlet /> : <Navigate to={PAGE_URLS.HOMEPAGE} />;
}

export default PrivateRoute;
