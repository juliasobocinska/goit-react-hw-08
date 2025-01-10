import ContactForm from "../../components/ContactForm/ContactForm.jsx";
import SearchForm from "../../components/SearchForm/SearchForm.jsx";
import ContactList from "../../components/ContactList/ContactList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/auth/operations.js";
import DocumentTitle from "../../components/DocumentTitle.jsx";

export default function Contacts() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <>
      <DocumentTitle>Contacts</DocumentTitle>
      <div>
        <h1>Phonebook</h1>

        <ContactForm />
        <SearchForm />
        {loading && <b>Loading contacts...</b>}
        {error && <b>{error}</b>}
        <ContactList />
      </div>
    </>
  );
}