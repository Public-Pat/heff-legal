import * as RadixAccordion from "@radix-ui/react-accordion";
import styles from "./Accordion.module.scss";
import PlusIcon from "@/assets/icons/PlusIcon";
import MinusIcon from "@/assets/icons/MinusIcon";
import { PrismicRichText } from "@prismicio/react";

const Accordion = ({ items }) => (
  <RadixAccordion.Root type="multiple">
    {items.map((item, index) => {
      return (
        <RadixAccordion.Item
          className={styles.Item}
          key={index}
          value={`item-${index}`}
        >
          <RadixAccordion.Header className={styles.Header}>
            <RadixAccordion.Trigger className={`${styles.Trigger} strip-styles`}>
              <div className={styles.TriggerInner}>
                <p>{item.title}</p>
              </div>
              <div className={styles.Icons}>
                <PlusIcon />
                <MinusIcon />
              </div>
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content className={styles.Content}>
            <div className="rich-text">
              <PrismicRichText field={item.content} />
            </div>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      );
    })}
  </RadixAccordion.Root>
);

export default Accordion;
