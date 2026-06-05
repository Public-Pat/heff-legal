// WHO CAN EDIT:
// Logo / Audio controls (line 41): Junior, Mid, Senior
// Other: Senior

import { PrismicRichText, PrismicText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import styles from "./HeroTextOnly.module.scss";
import {
  HeroSliceHeroTextOnlyPrimary,
} from "../../../../prismicio-types";
import classNames from "classnames";
import { bgNameToClass } from "@/utils/helpers";

const HeroTextOnly = ({
                         text,
                         title,
                         heading_1,
                         background_colour,
                         cta,
                       }: HeroSliceHeroTextOnlyPrimary) => {
  const HolderClasses = classNames(styles.Holder, bgNameToClass(background_colour));
  return (
    <div className={HolderClasses}>
      <div className={styles.Inner}>
        <div className={styles.Content}>
          {isFilled.richText(heading_1) &&
            <div className={styles.Subheading}><PrismicRichText field={heading_1} /></div>}
          {!isFilled.richText(heading_1) && isFilled.richText(title) &&
            <h1 className={styles.Title}><PrismicText field={title} /></h1>}
          {isFilled.richText(heading_1) && isFilled.richText(title) &&
            <p className={styles.Title}><PrismicText field={title} /></p>}
          {isFilled.richText(text) && <div className={styles.Text}><PrismicRichText field={text} /></div>}
          {Array.isArray(cta) && cta.length > 0 && isFilled.link(cta[0]) && (
            <div className={styles.LinkListHolder}>
              {cta.map(
                (link, index) =>
                  isFilled.link(link) && (
                    <PrismicNextLink
                      className={`${link.variant ?? ""} button`}
                      field={link}
                      key={index}
                    />
                  ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroTextOnly;
