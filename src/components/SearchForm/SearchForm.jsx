import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filtersContact } from "../../redux/auth/filterSlice"; 
import styles from "../../css/SearchForm.module.css"; 

const SearchBox = () => {
  const filter = useSelector((state) => state.filters.name || "");  
  const dispatch = useDispatch();  

  const handleChange = (evt) => {
    dispatch(filtersContact(evt.target.value)); 
  };

  return (
    <div className={styles.searchContainer}> 
      <p className={styles.searchLabel}>Find contacts by name</p>
      <input
        type="text"
        value={filter}  
        onChange={handleChange}  
        placeholder="search contacts..."  
        className={styles.searchInput} 
      />
    </div>
  );
};

export default SearchBox;