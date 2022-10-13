import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Products from "./Components/Products/Products";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Favorite from "./Components/Favorite/Favorite";
import MyProfile from "./Components/MyProfile/MyProfile";
import Login, { cookies } from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import ErrorPage from "./Components/Error/Error";
import {
  createBrowserRouter,
  Navigate,
  NavLink,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import ProductForm from "./Components/Products/ProductForm";

interface ProtectedRouteProps {
  redirectPath?: string;
  children: any;
}

const ProtectedRoute = ({
  redirectPath = "/api/login",
  children,
}: ProtectedRouteProps) => {
  const isAllowed = cookies.get("token");
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

const PublicRoute = ({
  redirectPath = "/api/products",
  children,
}: ProtectedRouteProps) => {
  const isAllowed = cookies.get("token");
  if (!isAllowed) {
    return children ? children : <Outlet />;
  }
  return <Navigate to={redirectPath} replace />;
};

const router = createBrowserRouter([
  {
    path: "/api/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "products",
            element: <Products />,
            children: [
              // {
              //   errorElement: <ErrorPage />,
              //   path: "add",
              //   element: <ProductForm />,
              // },
            ],
          },
          {
            path: "products/add",
            element: <ProductForm />,
          },
          {
            path: "cart",
            element: <Cart />,
            children: [
              // {
              //   errorElement: <ErrorPage />,
              //   path: ":productId",
              //   element: <Cart/>,
              // },
            ],
          },
          {
            path: "favorites",
            element: (
              <ProtectedRoute>
                <Favorite />
              </ProtectedRoute>
            ),
          },
          {
            path: "my-profile",
            element: (
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            ),
          },
          {
            path: "login",
            element: (
              <PublicRoute>
                <Login />
              </PublicRoute>
            ),
          },
          {
            path: "register",
            element: (
              <PublicRoute>
                <Register />
              </PublicRoute>
            ),
          },
          {
            path: "*",
            element: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
