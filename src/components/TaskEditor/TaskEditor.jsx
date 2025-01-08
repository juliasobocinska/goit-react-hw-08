import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addTask } from '../../redux/tasks/operations';
import styles from "../../styles/TaskEditor.module.css";

const validationSchema = Yup.object({
  text: Yup.string()
    .required('Task cannot be empty. Enter some text!')
    .max(100, 'Task cannot be longer than 100 characters'),
});

const TaskEditor = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addTask(values.text));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ text: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className={styles.form}>
          <div className={styles.inputWrapper}>
            <Field 
              name="text" 
              placeholder="Enter your task" 
              className={styles.input} 
            />
            <ErrorMessage 
              name="text" 
              component="div" 
              className={styles.error} 
            />
          </div>
          <button type="submit" className={styles.button}>
            Add Task
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default TaskEditor;
