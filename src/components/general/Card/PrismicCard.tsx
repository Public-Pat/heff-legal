// WHO CAN EDIT:
// Link href: Junior
// Duplicate and use for another instance: Mid
// Adding search highlighting for a search hit instance: Mid
// Structure: Senior
"use client";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import styles from "./Card.module.scss";
import { PrismicRichText } from "@prismicio/react";
import {
  ContentListSliceDefaultPrimaryContentItem,
} from "../../../../prismicio-types";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { motion, MotionValue, useTransform } from "motion/react";
import { calculateStagger } from "@/utils/helpers";

interface PrismicCardProps {
  item: ContentListSliceDefaultPrimaryContentItem;
  scrollYProgress: MotionValue<number>;
  index: number;
  totalCards: number;
}

const hasBg = false;

const PrismicCard: React.FC<PrismicCardProps> = ({ item, totalCards, scrollYProgress, index }) => {
  // Calculate the stagger delay for each item.
  const {start, end} = calculateStagger({index, itemDuration: 0.5, animationTotalDuration: 1, totalCards});

  // Transform scroll progress into `y` and `opacity` values.
  const y = useTransform(scrollYProgress, [start, end], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, start, end, 1], [0, 0, 1, 1]);

  const [showFallback, setShowFallback] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.log("Autoplay was prevented by the browser.");
        // Autoplay was blocked, show fallback image
        setShowFallback(true);
      });
    } else {
      console.log("Autoplay was allowed by the browser.");
      setShowFallback(false);
    }
  }, []);

  const contentField = item.page;
  // --------------
  // Below is an example of how to handle when the content list has more than one page type available (ie. you add POST to it)
  // const contentField = isFilled.contentRelationship(item.post) ? item.post : item.page;
  // --------------
  if (!isFilled.contentRelationship(contentField)) {
    return null;
  }
  if (!contentField.data) {
    return <div className={styles.MockPost}><p>Content card</p></div>;
  }
  const { title, preview_image, excerpt, preview_video, video_poster_image } = contentField.data as any;

  const HolderClasses = classNames(styles.Holder, {
    [styles.HasBg]: hasBg,
  });

  return (
    <PrismicNextLink field={contentField} className={HolderClasses}>
      <motion.div
        className={styles.Inner}
        style={{ opacity, y }}
      >
        <div className={styles.Image}>
          {isFilled.linkToMedia(preview_video) && !showFallback && (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              poster={video_poster_image?.url || undefined}
            >
              <source
                src={preview_video?.url || undefined}
                type="video/mp4"
              />
            </video>
          )}
          {isFilled.image(video_poster_image) && showFallback && (
            <PrismicNextImage
              className={styles.VideoFallbackImage}
              field={video_poster_image}
              loading="lazy"
              priority={false}
              fallbackAlt=""
            />
          )}
          {isFilled.image(preview_image) && !isFilled.linkToMedia(preview_video) && (
            <PrismicNextImage
              className={styles.StandardImage}
              field={preview_image}
              loading="lazy"
              priority={false}
              fallbackAlt=""
            />
          )}
        </div>
        {(isFilled.keyText(title) || isFilled.richText(excerpt)) && (
          <div className={styles.Content}>
            {isFilled.keyText(title) && (
              <h3 className={styles.Title}>{title}</h3>
            )}
            {isFilled.richText(excerpt) && (
              <div className={styles.Text}>
                <PrismicRichText field={excerpt} />
              </div>
            )}
          </div>
        )}
      </motion.div>
    </PrismicNextLink>
  );
};

export default PrismicCard;
