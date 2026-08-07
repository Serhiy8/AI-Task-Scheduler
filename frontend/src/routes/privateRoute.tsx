import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { currentUser } from "../redux/slice/operations/authOperations";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { tokenHeader } from "../api/api";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const tokenFromState = useAppSelector((state) => state.auth.token);

  if (isLoggedIn && tokenFromState) {
    tokenHeader.set(tokenFromState);
  }

  useEffect(() => {
    const fetcCurrentUser = async () => {
      await dispatch(currentUser());
    };
    fetcCurrentUser();
  }, [dispatch]);

  return isLoggedIn ? children : <Navigate to="/login" />;
};
