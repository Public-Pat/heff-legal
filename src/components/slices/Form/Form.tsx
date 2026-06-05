// WHO CAN EDIT: Senior

import { PrismicRichText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import styles from "./Form.module.scss";
import { FormProps } from "@/slices/Form";
import classNames from "classnames";
import { PrismicNextLink } from "@prismicio/next";
import { bgNameToClass } from "@/utils/helpers";

const Form = ({
                heading_2,
                description,
                cta,
                form,
                background_colour,
              }: FormProps["slice"]["primary"]) => {
  const HolderClasses = classNames(styles.Holder, bgNameToClass(background_colour));

  return (
    <div className={HolderClasses}>
      <div className={styles.Inner}>
        <div className={styles.Content}>
          {isFilled.richText(heading_2) && <PrismicRichText field={heading_2} />}
          {isFilled.richText(description) && <PrismicRichText field={description} />}
          {Array.isArray(cta) && cta.length > 0 && isFilled.link(cta[0]) && (
            <div className={styles.Ctas}>
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
        <div className={styles.FormHolder}>
          {isFilled.embed(form) && form.provider_name !== "Tally Forms" && <p>This embed field is only for Tally Forms</p>}
          {isFilled.embed(form) && form.provider_name === "Tally Forms" && form.html && <div
            className={styles.Form}
            dangerouslySetInnerHTML={{
              __html: form.html,
            }}
          />}
        </div>
      </div>
    </div>
  );
};

export default Form;
