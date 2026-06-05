// WHO CAN EDIT:
// Link href: Junior
// Duplicate and use for another instance: Mid
// Adding search highlighting for a search hit instance: Mid
// Structure: Senior

import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import styles from "./Card.module.scss";
import Link from "next/link";
import { Highlight } from "react-instantsearch";
import { BaseHit } from "instantsearch.js";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

interface FlexibleCardProps {
  hit: BaseHit;
}

const hasBg = false;
const SearchHit: React.FC<FlexibleCardProps> = ({ hit }) => {
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

  const { title, slug, preview_image, excerpt, preview_video, video_poster_image } =
    hit;

  const HolderClasses = classNames(styles.Holder, {
    [styles.HasBg]: hasBg,
  });

  return (
    <Link href={`/posts/${slug}`} className={HolderClasses}>
      <div className={styles.Inner}>
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
              <p className={styles.Title}>
                {/*@ts-ignore*/}
                <Highlight attribute="title" hit={hit} />
              </p>
            )}
            <div className={styles.Text}>
              <p>
                {/*@ts-ignore*/}
                <Highlight attribute="excerpt" hit={hit} />
              </p>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default SearchHit;
