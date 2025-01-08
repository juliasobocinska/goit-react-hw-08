import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import { register } from '../../redux/auth/operations';
import styles from "../../styles/RegisterForm.module.css";

const RegisterForm = () => {
  const dispatch = useDispatch();

  // Walidacja za pomocą Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Username is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        dispatch(register(values));
        resetForm(); // Resetuj formularz po wysłaniu
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <label className={styles.label}>
            Username
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" className={styles.error} />
          </label>

          <label className={styles.label}>
            Email
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" className={styles.error} />
          </label>

          <label className={styles.label}>
            Password
            <Field type="password" name="password" />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.error}
            />
          </label>

          <button type="submit" disabled={isSubmitting}>
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
