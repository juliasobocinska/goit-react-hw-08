import { Field, Form, Formik, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import * as Yup from "yup";

// Schemat walidacji z Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function RegisterForm() {
  const dispatch = useDispatch();

  // Funkcja obsługująca wysyłanie formularza
  const handleSubmit = (values, actions) => {
    console.log("Form values:", values);

    dispatch(register(values))
      .unwrap() 
      .then((response) => {
        console.log("Register response:", response); 
        actions.setStatus({ success: "User registered successfully!" });
      })
      .catch((error) => {
        console.error("Register error:", error); 
        actions.setStatus({ error: `Registration failed: ${error}` });
      })
      .finally(() => {
        actions.resetForm();
      });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", name: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ status }) => (
        <Form>
          <div>
            <p>Name</p>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" className="error-message" />
          </div>

          <div>
            <p>Email</p>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" className="error-message" />
          </div>

          <div>
            <p>Password</p>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" className="error-message" />
          </div>

          <button type="submit">Register</button>

         
          {status?.success && <div className="success-message">{status.success}</div>}
          {status?.error && <div className="error-message">{status.error}</div>}
        </Form>
      )}
    </Formik>
  );
}
