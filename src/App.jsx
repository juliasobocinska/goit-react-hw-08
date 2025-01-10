import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import RestrictedRoute from "./components/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute";
import { Suspense } from "react";
import Navigation from "./components/Navigation/Navigation";
import AuthNav from "./components/IsLogged/AuthNav";
import TasksPage from "./components/Tasks/Tasks";
import { Toaster } from "react-hot-toast"; 

// Lazy loading dla stron
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const ContactsPage = lazy(() => import("./pages/Contact/Contact"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const EditContactPage = lazy(() => import("./pages/EditContactPage/EditContactPage")); 

export function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
     
      <Toaster position="top-right" />

      <Navigation />
      <AuthNav />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectPath="/login" element={<ContactsPage />} />
          }
        />
        <Route
          path="/contacts/edit/:contactId" 
          element={
            <PrivateRoute redirectPath="/login" element={<EditContactPage />} />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectPath="/tasks" element={<LoginPage />} />
          }
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectPath="/tasks"
              element={<RegisterPage />}
            />
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute redirectPath="/login" element={<TasksPage />} />
          }
        />
      </Routes>
    </Suspense>
  );
}
