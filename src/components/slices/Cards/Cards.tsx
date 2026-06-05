// WHO CAN EDIT: Senior
"use client"
import { PrismicRichText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import styles from "./Cards.module.scss";
import classNames from "classnames";
import { CardsProps } from "@/slices/Cards";
import ContentCard from "@/components/general/ContentCard/ContentCard";
import { bgNameToClass } from "@/utils/helpers";
import { useRef } from "react";
import { useScroll } from "motion/react";

const Cards = ({
                 title,
                 heading_2,
                 description,
                 cards,
                 background_colour,
                 cards_colour,
                 columns,
               }: CardsProps["slice"]["primary"]) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.8"],
  });
  const HolderClasses = classNames(styles.Holder, bgNameToClass(background_colour));
  const GridClasses = classNames(styles.Grid, {
    [styles.IsFour]: columns === "Four",
  });
  return (
    <div className={HolderClasses}>
      <div className={styles.Inner}>
        <div className={styles.Headings}>
          {isFilled.keyText(heading_2) &&
            <div className={styles.Subheading}><h2>{heading_2}</h2></div>}
          {!isFilled.keyText(heading_2) && isFilled.keyText(title) && <h2 className={styles.Title}>{title}</h2>}
          {isFilled.keyText(heading_2) && isFilled.keyText(title) && <p className={styles.Title}>{title}</p>}
          {isFilled.richText(description) &&
            <div className={styles.Description}><PrismicRichText field={description} /></div>}
        </div>
        <div>
          <div className={GridClasses} ref={ref}>
            {cards.map((card, index) => {
              if (!isFilled.keyText(card.title)) return null;
              return (
                <ContentCard
                  key={index}
                  title={card.title}
                  text={card.text}
                  cta={card.cta}
                  icon={card.icon}
                  color={bgNameToClass(cards_colour)}
                  scrollYProgress={scrollYProgress}
                  index={index}
                  totalCards={cards.length}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
