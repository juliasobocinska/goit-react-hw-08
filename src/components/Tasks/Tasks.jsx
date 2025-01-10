import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Fuse from "fuse.js";
import ContactForm from "../../components/ContactForm/ContactForm";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { selectNameFilter } from "../../redux/auth/filterSlice";
import SearchForm from "../../components/SearchForm/SearchForm";
import ContactList from "../../components/ContactList/ContactList";
import { addDefaultContacts } from "../../redux/auth/operations";
import { openModal } from "../../redux/auth/modal"; // Akcja otwierająca modal
import { selectIsModalOpen } from "../../redux/auth/selectors"; // Selektor stanu modala
import DeleteModal from "../../components/DeleteModal/DeleteModal";

const TasksPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const contacts = useSelector((state) => state.contacts.items);
  const isModalOpen = useSelector(selectIsModalOpen);
  const searchQuery = useSelector(selectNameFilter);
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(addDefaultContacts());
    }
  }, [isLoggedIn, dispatch]);

  // Memoizowanie instancji Fuse
  const fuse = useMemo(
    () =>
      new Fuse(contacts, {
        keys: ["name", "number"],
        threshold: 0.3,
      }),
    [contacts]
  );

  useEffect(() => {
    if (searchQuery) {
      const results = fuse.search(searchQuery);
      setFilteredContacts(results.map((result) => result.item));
    } else {
      setFilteredContacts(contacts);
    }
  }, [searchQuery, contacts, fuse]);

  // Funkcja obsługująca otwieranie modala
  const handleDeleteClick = (contactId) => {
    dispatch(openModal(contactId));
  };

  return (
    <div>
      <h1>Tasks Page</h1>
      <ContactForm />
      <SearchForm />
      <ContactList
        contacts={filteredContacts}
      />
      {isModalOpen && <DeleteModal />}
    </div>
  );
};

export default TasksPage;
