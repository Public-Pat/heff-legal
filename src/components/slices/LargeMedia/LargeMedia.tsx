// WHO CAN EDIT: Senior
"use client";
import styles from "./LargeMedia.module.scss";
import { LargeMediaProps } from "@/slices/LargeMedia";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import ResponsiveVimeo from "@/components/general/ResponsiveVimeo/ResponsiveVimeo";
import classNames from "classnames";
import { bgNameToClass } from "@/utils/helpers";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";

const LargeMedia = ({
  image,
  video,
  caption,
  cropped,
  mobile_image,
  background_colour,
  no_padding
}: LargeMediaProps["slice"]["primary"]) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.6"],
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(5% 5% 5% 5% round 0.5rem)", "inset(0% 0% 0% 0% round 0.5rem)"],
  );

  if (!isFilled.image(image) && !isFilled.embed(video)) return null;

  const imageHolderClasses = classNames(styles.ImageHolder, {
    [styles.Cropped]: cropped,
    [styles.DesktopOnly]: isFilled.image(mobile_image),
  });

  const mobileImageHolderClasses = classNames(styles.ImageHolder, {
    [styles.Cropped]: cropped,
    [styles.MobileOnly]: !isFilled.embed(video) && isFilled.image(mobile_image),
  });
  const HolderClasses = classNames(styles.Holder, bgNameToClass(background_colour), {
    [styles.NoPadding]: no_padding,
  });

  return (
    <div ref={ref} className={HolderClasses}>
      <div className={styles.Inner}>
        {!isFilled.embed(video) && (
          <motion.div className={imageHolderClasses} style={{ clipPath }}>
            <PrismicNextImage field={image} fallbackAlt="" />
          </motion.div>
        )}
        {!isFilled.embed(video) && isFilled.image(mobile_image) && (
          <motion.div className={mobileImageHolderClasses} style={{ clipPath }}>
            <PrismicNextImage field={mobile_image} fallbackAlt="" />
          </motion.div>
        )}
        {isFilled.embed(video) && (
          <ResponsiveVimeo
            videoId={video.video_id as number}
            autoplay
            audioControls={false}
          />
        )}
        {caption && (
          <div className={styles.Caption}>
            <p>{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LargeMedia;
