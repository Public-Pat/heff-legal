import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import LargeMediaComponent from "@/components/slices/LargeMedia/LargeMedia";

/**
 * Props for `LargeMedia`.
 */
export type LargeMediaProps = SliceComponentProps<Content.LargeMediaSlice>;

/**
 * Component for "LargeMedia" Slices.
 */
const LargeMedia = ({ slice }: LargeMediaProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <LargeMediaComponent {...slice.primary} />
    </section>
  );
};

export default LargeMedia;
