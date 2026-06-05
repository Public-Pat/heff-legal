import AccordionSectionHolder from "@/components/slices/AccordionSection/AccordionSectionHolder";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `AccordionSection`.
 */
export type AccordionSectionProps =
  SliceComponentProps<Content.AccordionSectionSlice>;

/**
 * Component for "AccordionSection" Slices.
 */
const AccordionSection = ({ slice }: AccordionSectionProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <AccordionSectionHolder {...slice.primary} />
    </section>
  );
};

export default AccordionSection;
