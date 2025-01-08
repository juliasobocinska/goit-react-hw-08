// src/App.jsx
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { lazy } from "react";
import RestrictedRoute from "./components/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const ContactsPage = lazy(() => import("./pages/Contact/Contact"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/contacts"
          element={<PrivateRoute redirectPath="/login" Component={ContactsPage} />}
        />
        <Route
          path="/login"
          element={<RestrictedRoute redirectPath="/contacts" Component={LoginPage} />}
        />
        <Route
          path="/register"
          element={<RestrictedRoute redirectPath="/contacts" Component={RegisterPage} />}
        />
      </Routes>
    </Layout>
  );
}
