import React from 'react';
import DocumentTitle from '../../DocumentTitle';
import  RegisterForm  from '../../components/RegisterForm/RegisterForm';

export default function RegisterPage() {
  console.log('RegisterPage rendered');  
  return (
    <div>
      <DocumentTitle>Registration</DocumentTitle>
      <RegisterForm />
    </div>
  );
}
