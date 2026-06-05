// WHO CAN EDIT: Senior

import { LayoutDocumentData } from "../../../../prismicio-types";
import styles from "@/components/layout/Footer/Footer.module.scss";
import Link from "next/link";
import Logo from "@/assets/svg/logo.svg";
import { isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

interface FooterProps {
  layoutData: LayoutDocumentData;
}

export default async function Footer({ layoutData }: FooterProps) {
  const { text, social_links, links_1, links_title_1 } = layoutData;

  return (
    <footer className={styles.Holder}>
      <div className={styles.Inner}>
        <div className={styles.Branding}>
          <Link href="/" className={styles.Logo}>
            <Logo />
          </Link>
          {isFilled.richText(text) && (
            <div className={styles.Copy}>
              <PrismicRichText field={text} />
            </div>
          )}
        </div>
        {links_1.length > 0 && (
          <nav className={styles.Nav}>
            {isFilled.keyText(links_title_1) && <p>{links_title_1}</p>}
            <ul>
              {links_1.map(({ link }, index) => (
                <li key={index}>
                  <PrismicNextLink field={link}>{link.text}</PrismicNextLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <nav className={styles.Nav}>
          <ul>
            {social_links.map((link, index) => (
              <li key={index}>
                <PrismicNextLink field={link.link}>
                  {isFilled.image(link.icon) ? (
                    <PrismicNextImage field={link.icon} fallbackAlt="" />
                  ) : link.link.text ? (
                    link.link.text
                  ) : (
                    "Link"
                  )}
                </PrismicNextLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className={styles.Attribution}>
        Designed by{" "}
        <a href="https://publicwebsites.com/" target="_blank">
          Public
        </a>
        , built by{" "}
        <a href="https://supermarket.london/" target="_blank">
          Supermarket
        </a>
      </p>
    </footer>
  );
}
