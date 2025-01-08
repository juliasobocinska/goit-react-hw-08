import React from 'react';
import DocumentTitle from '../../DocumentTitle';
import  LoginForm  from '../../components/LoginForm/LoginForm';

export default function LoginPage() {
  console.log('LoginPage rendered'); 
  return (
    <div>
      <DocumentTitle>Login</DocumentTitle>
      <LoginForm />
    </div>
  );
}
