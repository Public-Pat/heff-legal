import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import FeatureComponent from "@/components/slices/Feature/Feature";

/**
 * Props for `Feature`.
 */
export type FeatureProps = SliceComponentProps<Content.FeatureSlice>;

/**
 * Component for "Feature" Slices.
 */
const Feature = ({ slice }: FeatureProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <FeatureComponent {...slice.primary} />
    </section>
  );
};

export default Feature;
