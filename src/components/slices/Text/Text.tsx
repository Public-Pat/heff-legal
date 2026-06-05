// WHO CAN EDIT: Senior
"use client";
import { isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import styles from "./Text.module.scss";
import { TextProps } from "@/slices/Text";
import { bgNameToClass, convertToId } from "@/utils/helpers";
import { PrismicNextLink } from "@prismicio/next";
import classNames from "classnames";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";


const Text = ({
                text,
                anchor_link_id,
                cta,
                text_size,
                heading_2,
                background_color,
                inner_background_colour,
              }: TextProps["slice"]["primary"]) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.6"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  const InnerClasses = classNames(styles.Inner, bgNameToClass(inner_background_colour), {
    [styles.InnerBg]: background_color !== inner_background_colour,
  });
  const TextHolderClasses = classNames(
    styles.TextHolder,
    styles[text_size],
    "rich-text",
  );
  const HolderClasses = classNames(styles.Holder, bgNameToClass(background_color));

  return (
    <>
      {isFilled.richText(text) && (
        <div
          className={HolderClasses}
          id={anchor_link_id ? convertToId(anchor_link_id) : ""}
          ref={ref}
        >
          <motion.div
            className={InnerClasses}
            style={{ opacity, y }}
          >
            <div className={TextHolderClasses}>
              {isFilled.richText(heading_2) && (
                <div className={styles.Subheading}>
                  <PrismicRichText field={heading_2} />
                </div>
              )}
              <PrismicRichText field={text} />
              {Array.isArray(cta) &&
                cta.length > 0 &&
                isFilled.link(cta[0]) && (
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
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Text;
