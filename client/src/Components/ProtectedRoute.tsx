import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const useAuth=()=>{
    return true;
}

export default function ProtectedRoute() {
  const auth=useAuth();

  return auth?<Outlet />:<Navigate to="/login"/>
}