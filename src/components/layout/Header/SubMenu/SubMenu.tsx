"use client";
import React, { useState } from "react";
import { PrismicNextLink } from "@prismicio/next";
import styles from "./SubMenu.module.scss";

const SubMenu = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!items || items.length === 0) return null;

  const firstItem = items[0];
  const dropdownItems = items.slice(1); // All items except the first one

  return (
    <div
      className={styles.SubMenuContainer}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Main menu item that triggers dropdown */}
      <PrismicNextLink field={firstItem} className={styles.MainLink}>
        {firstItem.text}
        {dropdownItems.length > 0 && (
          <span className={styles.Arrow}>&darr;</span>
        )}
      </PrismicNextLink>

      {/* Dropdown menu */}
      {isOpen && dropdownItems.length > 0 && (
        <div className={styles.Dropdown}>
          <ul className={styles.DropdownList}>
            {dropdownItems.map((item, index) => (
              <li key={index} className={styles.DropdownItem}>
                <PrismicNextLink field={item} className={styles.DropdownLink}>
                  {item.text}
                </PrismicNextLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SubMenu;

