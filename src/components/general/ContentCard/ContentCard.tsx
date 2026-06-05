import React from 'react';
import { ImageField, isFilled, LinkField, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import styles from './ContentCard.module.scss';
import classNames from "classnames";
import { motion, MotionValue, useTransform } from "motion/react";
import { calculateStagger } from "@/utils/helpers";

interface Props {
  // Define the props of the component here.
  // For example, a message prop:
  title: string,
  text: RichTextField
  cta?: LinkField
  icon?: ImageField
  color?: string
  scrollYProgress: MotionValue<number>;
  index: number;
  totalCards: number;
}

const ContentCard: React.FC<Props> = ({ title, text, cta, icon, color, totalCards, scrollYProgress, index }) => {

  // Calculate the stagger delay for each item.
  const {start, end} = calculateStagger({index, itemDuration: 0.5, animationTotalDuration: 1, totalCards});

  // Transform scroll progress into `y` and `opacity` values.
  const y = useTransform(scrollYProgress, [start, end], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, start, end, 1], [0, 0, 1, 1]);

  const HolderClasses = classNames(styles.Holder, color);
  return (
    <motion.div
      className={HolderClasses}
      style={{ opacity, y }}
    >
      {isFilled.image(icon) && <div className={styles.Icon}><PrismicNextImage field={icon} alt=""/></div>}
      <h3>{title}</h3>
      {isFilled.richText(text) && <div className={styles.Description}><PrismicRichText field={text} /></div>}
      {isFilled.link(cta) && <PrismicNextLink className={`${styles.Cta} button`} field={cta}/>}
    </motion.div>
  );
};

export default ContentCard;