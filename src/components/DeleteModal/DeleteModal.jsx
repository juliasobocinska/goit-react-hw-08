import { useDispatch, useSelector } from "react-redux";
import css from "../../css/DeleteModal.module.css";
import { deleteContact } from "../../redux/auth/operations";
import { closedModale } from "../../redux/auth/modal";
import { selectContactId } from "../../redux/auth/selectors";
import toast, { Toaster } from "react-hot-toast";

const succesDelete = () => toast("Contact has been removed");

export const DeleteModale = () => {
  const dispatch = useDispatch();

  const contactId = useSelector(selectContactId);

  const handleDelete = () => {
    dispatch(deleteContact(contactId));
    dispatch(closedModale());
    succesDelete();
  };

  const closedModal = () => {
    dispatch(closedModale());
  };

  return (
    <div className={css.modal}>
      <div className={css.modaleContent}>
        <p className={css.paragraph}>Delete that contact?</p>
        <div className={css.buttons}>
          <button className={css.button} onClick={handleDelete}>
            Yes
          </button>

          <button className={css.button} onClick={closedModal}>
            No
          </button>
          <Toaster />
        </div>
      </div>
    </div>
  );
};