// WHO CAN EDIT:
// Logo: Junior, Mid, Senior
// Other: Senior

"use client";
import { useState } from "react";
import logo from "../../../assets/logo-white.png";
import styles from "./MobileHeader.module.scss";
import Image from "next/image";
import Link from "next/link";
import CloseIcon from "@/assets/icons/CloseIcon";
import MenuIcon from "@/assets/icons/MenuIcon";
import NavigationMobile from "../NavigationMobile/NavigationMobile";
import Logo from "@/assets/svg/logo.svg";

const MobileHeader = ({ data }) => {
  const [showNav, setShowNav] = useState(false);
  const clickHandler = () => {
    setShowNav(!showNav);
  };

  return (
    <>
      <header className={styles.Header}>
        <div className={styles.Inner}>
          <div onClick={() => setShowNav(false)}>
            <Link href="/" className={styles.Logo}>
              <Logo />
            </Link>
          </div>
          <button className="strip-styles" onClick={() => setShowNav(!showNav)}>
            {showNav && <CloseIcon />}
            {!showNav && <MenuIcon />}
          </button>
        </div>
      </header>
      <NavigationMobile data={data} isOpen={showNav} setIsOpen={clickHandler} />
    </>
  );
};

export default MobileHeader;
