import { useDispatch } from 'react-redux';
import { deleteTask } from '../../redux/tasks/operations';
import styles from "../../styles/Task.module.css"


const Task = ({ id, text }) => {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteTask(id));

  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>{text}</p>
      <button type="button" className={styles.button} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Task;
