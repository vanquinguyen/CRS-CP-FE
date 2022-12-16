import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PAGE_URLS } from "../constants";

function PublicRoute({ id, role }) {
  const { pathname } = useLocation();
  if (
    id &&
    role !== "admin" &&
    (pathname === PAGE_URLS.LOGIN ||
      pathname === PAGE_URLS.REGISTER ||
      pathname === PAGE_URLS.REGISTER_DRIVER)
  ) {
    return <Navigate to="/" />;
  } else if (id && role === "admin") {
    return <Navigate to={PAGE_URLS.ADMIN} />;
  } else {
    return <Outlet />;
  }
}

export default PublicRoute;
