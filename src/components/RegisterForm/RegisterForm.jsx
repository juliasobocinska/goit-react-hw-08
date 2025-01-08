import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/operations";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(register(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", name: "" }}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <p>Name</p>
          <Field type="text" name="name" />
        </div>
        <div>
          <p>Email</p>
          <Field type="email" name="email" />
        </div>
        <div>
          <p>Password</p>
          <Field type="password" name="password" />
        </div>
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}