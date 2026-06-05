import React from "react";
import { useRefinementList, UseRefinementListProps } from "react-instantsearch";
import styles from "./SearchFilter.module.scss";
import classNames from "classnames";

export default function SearchFilter(props: UseRefinementListProps) {
  const { items, refine } = useRefinementList(props);

  const selectedStyles = classNames(styles.Selected, "selected-filter");
  return (
    <ul className={styles.Holder}>
      {items.map((item) => (
        <li key={item.label}>
          <button
            onClick={() => refine(item.value)}
            className={item.isRefined ? selectedStyles : styles.NotSelected}
          >
            {item.label} <span className={styles.Count}>{item.count}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
