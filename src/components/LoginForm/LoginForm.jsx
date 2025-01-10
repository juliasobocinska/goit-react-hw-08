import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { useState } from 'react';
import css from '../../css/LoginForm.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Walidacja prostego emaila
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    dispatch(
      logIn({ email, password })
    )
      .unwrap()
      .then(() => {
        console.log('login success');
        setError(null); 
      })
      .catch((err) => {
        console.log('login error');
        setError("Invalid email or password."); 
      });

    form.reset(); 
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={css.label}>
        Email
        <input type="email" name="email" required />
      </label>
      <label className={css.label}>
        Password
        <input type="password" name="password" required />
      </label>

      {error && <p className={css.error}>{error}</p>} 

      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginForm;
