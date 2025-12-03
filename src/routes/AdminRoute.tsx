import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Forbidden } from "../pages/Forbidden";

type Props = {
  children: React.ReactNode;
};

export const AdminRoute = ({ children }: Props) => {
  const { user } = useAuth();

  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  
  if (user.role !== "ADMIN") {
    return <Navigate to="/forbidden" replace />;
  }

  
  return <>{children}</>;
};
