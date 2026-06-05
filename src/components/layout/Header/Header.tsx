// WHO CAN EDIT:
// Logo: Junior, Mid, Senior
// Other: Senior

"use client";
import useScrollDirection from "@/hooks/useScrollDirection";
import styles from "./Header.module.scss";
import Link from "next/link";
import { PrismicNextLink } from "@prismicio/next";
import SubMenu from "./SubMenu/SubMenu";
import classNames from "classnames";
import { useEffect, useState } from "react";
import Logo from "../../../assets/svg/logo.svg";
import { isFilled } from "@prismicio/client";

const Header = ({ data }) => {
  const navItems = data?.links;
  const { scrollDirection, isAtTop } = useScrollDirection();
  const [hideHeader, setHideHeader] = useState(false);
  const [showBG, setShowBg] = useState(false);

  // If the user is scrolling down and not at the top of the screen, the header should hide. Otherwise it will be visible.
  const toggleOnScroll = true;

  useEffect(() => {
    setHideHeader(scrollDirection === "down" && !isAtTop);
    setShowBg(!isAtTop);
  }, [scrollDirection, isAtTop]);

  // If the user is at the top of the screen, the header should have a transparent background. Otherwise, it will have a white bg.

  const headerClasses = classNames(styles.Header, {
    [styles.Hide]: toggleOnScroll && hideHeader,
  });

  const backgroundClasses = classNames(styles.Background, {
    [styles.Show]: toggleOnScroll && showBG,
  });

  return (
    <header className={headerClasses}>
      <div className={backgroundClasses} />
      <div className={styles.Inner}>
        <Link href="/" className={styles.Logo}>
          <Logo />
        </Link>
        <nav className={styles.Nav}>
          <ul>
            {navItems?.map(({ link }, i) => {
              if (link.length === 1) {
                return (
                  <li key={i}>
                    <PrismicNextLink field={link[0]}>
                      {link[0].text}
                    </PrismicNextLink>
                  </li>
                );
              } else if (link.length > 1) {
                return <SubMenu key={i} items={link} />;
              } else {
                return null; // Handle case where link is empty
              }
            })}
            {isFilled.link(data.cta) && <li>
              <PrismicNextLink field={data.cta} className="button small"/>
            </li>}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
