// WHO CAN EDIT:
// Logo / Audio controls (line 41): Junior, Mid, Senior
// Other: Senior

import { PrismicRichText, PrismicText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import styles from "./HeroTwoColumn.module.scss";
import VimeoBackground from "@/components/general/VimeoBackground/VimeoBackground";
import { HeroSliceHeroTwoColumnPrimary } from "../../../../prismicio-types";
import classNames from "classnames";
import { bgNameToClass } from "@/utils/helpers";

const HeroTwoColumn = ({
                         text,
                         title,
                         heading_1,
                         background_image,
                         background_video,
                         background_video_from_media_library,
                         video_ratio,
                         background_colour,
                         cta,
                       }: HeroSliceHeroTwoColumnPrimary) => {
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
        <div className={styles.Image}>
          <div className={styles.ImageInner}>
            {isFilled.linkToMedia(background_video_from_media_library) && (
              <video
                className={styles.LibraryVideo}
                autoPlay
                loop
                muted
                playsInline
                poster={background_image?.url || undefined}
              >
                <source
                  src={background_video_from_media_library?.url || undefined}
                  type="video/mp4"
                />
              </video>
            )}
            {isFilled.embed(background_video) &&
              !isFilled.linkToMedia(background_video_from_media_library) && (
                <VimeoBackground
                  videoId={background_video.video_id as number}
                  autoplay={true}
                  zIndex={2}
                  audioControls={false}
                  aspectRatio={video_ratio || 16 / 9}
                />
              )}
            {isFilled.image(background_image) &&
              !isFilled.linkToMedia(background_video_from_media_library) &&
              !isFilled.embed(background_video) && (
                <PrismicNextImage field={background_image} fallbackAlt="" />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroTwoColumn;
