// WHO CAN EDIT: Senior

import { isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import styles from "./ImageGrid.module.scss";
import { ImageGridProps } from "@/slices/ImageGrid";
import ResponsiveVimeo from "@/components/general/ResponsiveVimeo/ResponsiveVimeo";
import classNames from "classnames";
import { PrismicRichText } from "@prismicio/react";
import { bgNameToClass } from "@/utils/helpers";
import VimeoBackground from "@/components/general/VimeoBackground/VimeoBackground";


const ImageGrid = ({
                     images,
                     title,
                     heading_2,
                     background_colour,
                     description,
                   }: ImageGridProps["slice"]["primary"]) => {
  // If the link is filled, render the link wrapped image / video
  // If the video or embed is filled + no link, video will play on hover
  // If the link is not filled, wrap image or video in a lightbox container

  const HolderClasses = classNames(
    styles.Holder,
    bgNameToClass(background_colour),
  );

  return (
    <div className={HolderClasses}>
      <div className={styles.TitlesHolder}>
        {isFilled.richText(heading_2) &&
          <div className={styles.Subheading}><PrismicRichText field={heading_2} /></div>}
        {!isFilled.richText(heading_2) && isFilled.keyText(title) && <h2 className={styles.Title}>{title}</h2>}
        {isFilled.richText(heading_2) && isFilled.keyText(title) && <p className={styles.Title}>{title}</p>}
        {isFilled.richText(description) &&
          <div className={styles.Subheading}><PrismicRichText field={description} /></div>}
      </div>

      <div className={styles.Grid}>
        {images.map((fields, index) => {
          if (
            !isFilled.image(fields.image) &&
            !isFilled.embed(fields.video) &&
            !isFilled.linkToMedia(fields.prismic_video)
          )
            return null;

          const ItemClasses = classNames(styles.Item, {
            [styles.Full]: fields.grid_width === "Full",
            [styles.Half]: fields.grid_width === "Half",
            [styles.Third]: fields.grid_width === "Third",
            [styles.Quarter]: fields.grid_width === "Quarter",
            [styles.TwoThirds]: fields.grid_width === "Two Thirds",
            [styles.Square]: fields.ratio === "Square",
            [styles.Portrait]: fields.ratio === "Portrait",
            [styles.Landscape]: fields.ratio === "Landscape",
          });
          return (
            <div className={ItemClasses} key={index}>
              {!isFilled.embed(fields.video) &&
                !isFilled.linkToMedia(fields.prismic_video) &&
                isFilled.image(fields.image) &&
                <PrismicNextImage className={styles.Image} field={fields.image} fallbackAlt="" />
              }
              {isFilled.embed(fields.video) &&
                !isFilled.linkToMedia(fields.prismic_video) && (
                  <>
                    {fields.ratio !== "Natural" && <div className={styles.VideoHolder}><VimeoBackground
                      videoId={fields.video.video_id as number}
                      autoplay
                      audioControls={false}
                    /></div>}
                    {fields.ratio === "Natural" && <ResponsiveVimeo
                      videoId={fields.video.video_id as number}
                      autoplay
                      audioControls={false}
                    />}
                  </>
                )}
              {isFilled.linkToMedia(fields.prismic_video) && (
                <div className={styles.VideoHolder}>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={fields.poster_image?.url || undefined}
                  >
                    <source
                      src={fields.prismic_video?.url || undefined}
                      type="video/mp4"
                    />
                  </video>
                </div>
              )}
              {(isFilled.keyText(fields.caption) ||
                isFilled.link(fields.link)) && (
                <div className={styles.Caption}>
                  {isFilled.keyText(fields.caption) && <p>{fields.caption}</p>}
                  {isFilled.link(fields.link) && (
                    <p>
                      <PrismicNextLink
                        field={fields.link}
                        className="button small"
                      >
                        {fields.link.text || "Read more"}
                      </PrismicNextLink>
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGrid;
