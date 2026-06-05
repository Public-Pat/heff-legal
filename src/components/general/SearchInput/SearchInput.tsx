"use client";
import styles from "./SearchInput.module.scss";
import { SearchBox } from "react-instantsearch";

const SearchInput = () => {
  return (
    <div className={styles.Holder}>
      <SearchBox placeholder="Search..." />
    </div>
  );
};

export default SearchInput;
