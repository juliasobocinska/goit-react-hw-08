import React, { useState } from "react";

const EditContactForm = ({ initialContact, onSubmit }) => {
  const [name, setName] = useState(initialContact.name);
  const [number, setNumber] = useState(initialContact.number);

  const handleSubmit = (e) => {
    e.preventDefault();
     // Wywołujemy funkcję onSubmit z nowymi danymi
    onSubmit({ name, number });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          // Aktualizacja stanu
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Number:
        <input
          type="text"
          value={number}
          // Aktualizacja stanu
          onChange={(e) => setNumber(e.target.value)} 
        />
      </label>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditContactForm;
