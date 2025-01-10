import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNameFilter } from "../../redux/auth/filterSlice"; 
import { selectNameFilter } from "../../redux/auth/filterSlice"; 
import styles from "../../css/SearchForm.module.css"; 

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter); 

  const handleChange = (evt) => {
    dispatch(setNameFilter(evt.target.value)); 
  };

  return (
    <div className={styles.searchContainer}>
      <p className={styles.searchLabel}>Find contacts by name or number</p>
      <input
        type="text"
        value={filter}  
        onChange={handleChange}  
        placeholder="Search contacts..."
        className={styles.searchInput}  
      />
    </div>
  );
};

export default SearchBox;
