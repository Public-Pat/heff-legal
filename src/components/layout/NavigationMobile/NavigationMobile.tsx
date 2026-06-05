"use client";
import styles from "./NavigationMobile.module.scss";
import { PrismicNextLink } from "@prismicio/next";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo-white.png";
import { isFilled } from "@prismicio/client";

const NavigationMobile = ({ data, isOpen, setIsOpen }) => {
  const overlayClasses = classNames(styles.Overlay, {
    [styles.Open]: isOpen,
  });

  const navItems = data?.links; // Fallback to default nav items if data is not provided

  return (
    <div className={styles.Holder}>
      <div className={overlayClasses}>
        <ul className={styles.Links}>
          {navItems?.map(({ link }, i) =>
            link?.map((link, j) => (
              <li key={`${i}-${j}`} onClick={() => setIsOpen(false)}>
                <PrismicNextLink field={link}>{link.text}</PrismicNextLink>
              </li>
            ))
          )}
          {isFilled.link(data.cta) && <li className={styles.Cta}>
            <PrismicNextLink field={data.cta} className="button"/>
          </li>}
        </ul>
      </div>
    </div>
  );
};

export default NavigationMobile;
