import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import { logIn } from '../../redux/auth/operations';
import styles from "../../styles/LoginForm.module.css";

// Walidacja za pomocą Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
});

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(
      logIn({
        email: values.email,
        password: values.password,
      })
    )
      .unwrap()
      .then(() => {
        console.log('login success');
        resetForm();
      })
      .catch(() => {
        console.log('login error');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }} 
      validationSchema={validationSchema} 
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form} autoComplete="off">
          <label className={styles.label}>
            Email
            <Field type="email" name="email" className={styles.input} />
            <ErrorMessage name="email" component="div" className={styles.error} />
          </label>
          
          <label className={styles.label}>
            Password
            <Field
              type="password"
              name="password"
              className={styles.input}
            />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.error}
            />
          </label>
          
          <button
            type="submit"
            className={styles.button}
            disabled={isSubmitting} 
          >
            Log In
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
