// src/components/Layout.jsx
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import AuthNav from "../components/IsLogged/AuthNav"
import css from "../css/Layout.module.css";

export function Layout() {
  return (
    <div className={css.layout}>
      <Navigation className={css.navigation} />
      <AuthNav />
      <Suspense fallback={<p className={css.loading}>Loading...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
