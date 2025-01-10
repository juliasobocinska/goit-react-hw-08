import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchContacts, updateContact } from "../../redux/auth/operations"; 
import EditContactForm from "../../components/EditContactForm/EditContactForm"; 

const EditContactPage = () => {
  const { contactId } = useParams(); 
  const contacts = useSelector((state) => state.contacts.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Stan przechowujący edytowany kontakt
  const [contact, setContact] = useState(null);

  // Ładowanie kontaktu przy pierwszym renderze
  useEffect(() => {
    dispatch(fetchContacts()); 
  }, [dispatch]);

  // Sprawdzamy, czy kontakt jest dostępny
  useEffect(() => {
    const foundContact = contacts.find((c) => c.id === contactId);
    if (foundContact) {
      setContact(foundContact);
    } else {
      navigate("/contacts"); 
    }
  }, [contacts, contactId, navigate]);

  // Funkcja aktualizacji kontaktu
  const handleUpdate = (updatedContact) => {
    dispatch(updateContact({ contactId, updatedContact })); 
    navigate("/contacts"); 
  };

  if (!contact) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Edit Contact</h2>
      <EditContactForm
        initialContact={contact}
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default EditContactPage;
