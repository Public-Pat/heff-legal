// WHO CAN EDIT:
// Structure: Senior
"use client";
import styles from "./ContentList.module.scss";
import { ContentListProps } from "@/slices/ContentList";
import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import PrismicCard from "@/components/general/Card/PrismicCard";
import { PrismicRichText } from "@prismicio/react";
import classNames from "classnames";
import { Key, useRef } from "react";
import { ContentListSliceDefaultPrimaryContentItem } from "../../../../prismicio-types";
import { bgNameToClass } from "@/utils/helpers";
import { useScroll } from "motion/react";

const ContentList = ({
                             title,
                             content,
                             cta,
                             heading_2,
                             background_colour,
                           }: ContentListProps["slice"]["primary"]) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.8"],
  });
  const HolderClasses = classNames(styles.Holder, bgNameToClass(background_colour));
  return (
    <div className={HolderClasses}>
      <div className={styles.Inner}>
        <div className={styles.Headings}>
          {isFilled.richText(heading_2) &&
            <div className={styles.Subheading}><PrismicRichText field={heading_2} /></div>}
          {!isFilled.richText(heading_2) && isFilled.keyText(title) && <h2 className={styles.Title}>{title}</h2>}
          {isFilled.richText(heading_2) && isFilled.keyText(title) && <p className={styles.Title}>{title}</p>}
        </div>
        <div className={styles.Grid} ref={ref}>
          {content.map((item: ContentListSliceDefaultPrimaryContentItem, index: number) => {
            if (!item) return null;
            return <PrismicCard
              key={index}
              item={item}
              scrollYProgress={scrollYProgress}
              index={index}
              totalCards={content.length}
            />;
          })}
        </div>
        {isFilled.link(cta) && (
          <div className={styles.CTA}>
            <PrismicNextLink className="button" field={cta} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentList;
