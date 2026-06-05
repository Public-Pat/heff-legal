import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import ImageGridComponent from "@/components/slices/ImageGrid/ImageGrid";

/**
 * Props for `ImageGrid`.
 */
export type ImageGridProps = SliceComponentProps<Content.ImageGridSlice>;

/**
 * Component for "ImageGrid" Slices.
 */
const ImageGrid = ({ slice }: ImageGridProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <ImageGridComponent {...slice.primary} />
    </section>
  );
};

export default ImageGrid;
