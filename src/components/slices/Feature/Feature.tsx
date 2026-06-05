// WHO CAN EDIT: Senior
"use client";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import styles from "./Feature.module.scss";
import { FeatureProps } from "@/slices/Feature";
import { PrismicRichText } from "@prismicio/react";
import VimeoBackground from "@/components/general/VimeoBackground/VimeoBackground";
import classNames from "classnames";
import { bgNameToClass } from "@/utils/helpers";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";

const Feature = ({
                   title,
                   text,
                   image,
                   video,
                   video_ratio,
                   link,
                   heading_2,
                   background_colour,
                   no_padding,
                   image_position,
                 }: FeatureProps["slice"]["primary"]) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.6"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(5% 5% 5% 5% round 0.5rem)", "inset(0% 0% 0% 0% round 0.5rem)"],
  );

  const HolderClasses = classNames(styles.Holder, bgNameToClass(background_colour), {
    [styles.NoPadding]: no_padding,
    [styles.ImageRight]: image_position === "Right",
    [styles.ImageLeft]: image_position === "Left",
  });
  return (
    <div className={HolderClasses}>
      <div ref={ref} className={styles.Inner}>
        <motion.div
          className={styles.Content}
          style={{ opacity, y }}
        >

          {isFilled.richText(heading_2) &&
            <div className={styles.Subheading}><PrismicRichText field={heading_2} /></div>}
          {!isFilled.richText(heading_2) && isFilled.keyText(title) && <h2 className={styles.Title}>{title}</h2>}

          {isFilled.richText(heading_2) && isFilled.keyText(title) && <p className={styles.Title}>{title}</p>}

          {isFilled.richText(text) && (
            <div className={styles.Text}>
              <PrismicRichText field={text} />
            </div>
          )}
          {isFilled.link(link) && (
            <PrismicNextLink field={link} className="button" />
          )}
        </motion.div>
        <div className={styles.Image}>
          <motion.div className={styles.ImageInner} style={{ clipPath }}>
            {!isFilled.embed(video) && (
              <PrismicNextImage field={image} fallbackAlt="" />
            )}
            {isFilled.embed(video) && (
              <VimeoBackground
                videoId={video.video_id as number}
                autoplay={true}
                aspectRatio={video_ratio || 16 / 9}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
