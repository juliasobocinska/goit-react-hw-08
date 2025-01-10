import { useDispatch, useSelector } from "react-redux";
import css from "../../css/DeleteModal.module.css";
import { deleteContact } from "../../redux/auth/operations";
import { closeModal } from "../../redux/auth/modal"; 
import { selectContactId, selectIsModalOpen } from "../../redux/auth/selectors";
import toast from "react-hot-toast";

const successDelete = () => toast.success("Kontakt został usunięty");

const DeleteModal = () => {
  const dispatch = useDispatch();
  const contactId = useSelector(selectContactId); 
  // Sprawdzamy, czy modal jest otwarty
  const isModalOpen = useSelector(selectIsModalOpen); 

   // Modal nie renderuje się, jeśli nie jest otwarty
  if (!isModalOpen) {
    return null;
  }

  const handleDelete = () => {
    if (contactId) {
      dispatch(deleteContact(contactId)); 
      dispatch(closeModal()); 
      successDelete(); 
    }
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className={css.modal}>
      <div className={css.modaleContent}>
        <p className={css.paragraph}>Are you sure you want delete this contact?</p>
        <div className={css.buttons}>
          <button className={css.button} onClick={handleDelete}>
            Tak
          </button>
          <button className={css.button} onClick={handleCancel}>
            Nie
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
