import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    return !isLoggedIn ? children : <Navigate to="/tasks" />;
}