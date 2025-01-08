import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import  AppBar  from '../src/components/AppBar/AppBar';

export const Layout = () => {
  return (
    <div>
      <AppBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
