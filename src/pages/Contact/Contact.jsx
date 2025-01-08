import ContactForm from "../components/ContactForm/ContactForm.jsx";
import SearchBox from "../components/SesrchBox/SearchBox.jsx";
import ContactList from "../components/ContactList/ContactList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "../redux/operations";
import css from "./Contacts.module.css";
import DocumentTitle from "../components/DocumentTitle.jsx";

export default function Contacts() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <>
      <DocumentTitle>Contacts</DocumentTitle>
      <div className={css.contacts}>
        <h1>Phonebook</h1>

        <ContactForm />
        <SearchBox />
        {loading && <b>Loading contacts...</b>}
        {error && <b>{error}</b>}
        <ContactList />
      </div>
    </>
  );
}