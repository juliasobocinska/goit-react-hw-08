import React, { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";
import { refreshUser } from "../src/redux/auth/operations";
import { selectIsRefreshing } from "../src/redux/auth/selectors";
import "./App.css";

// Lazy loading komponentów
const HomePage = lazy(() => import("../src/pages/HomePage/HomePage"));
const RegisterPage = lazy(() => import("../src/pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../src/pages/LoginPage/LoginPage"));
const TasksPage = lazy(() => import("../src/pages/TasksPage/TasksPage"));

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Restricted Route for RegisterPage */}
          <Route
            path="/register"
            element={
              <RestrictedRoute redirectTo="/tasks">
                <RegisterPage />
              </RestrictedRoute>
            }
          />
          
          {/* Restricted Route for LoginPage */}
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/tasks">
                <LoginPage />
              </RestrictedRoute>
            }
          />
          
          {/* Private Route for TasksPage */}
          <Route
            path="/tasks"
            element={
              <PrivateRoute redirectTo="/login">
                <TasksPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
