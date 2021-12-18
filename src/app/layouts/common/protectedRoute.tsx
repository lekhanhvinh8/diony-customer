import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import auth, {
  DecodeUser,
  roleCustomer,
  roleSeller,
} from "../../services/authService";

interface Props {}

const checkUserValid = (user: DecodeUser | null) => {
  if (user === null) return false;

  if (user.role !== roleCustomer && user.role !== roleSeller) return false;

  return true;
};

const ProtectedRoute: React.FC<Props> = () => {
  let location = useLocation();
  const user = auth.getCurrentUser();
  return checkUserValid(user) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
