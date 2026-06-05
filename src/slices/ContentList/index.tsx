import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import ContentListComponent from "@/components/slices/ContentList/ContentList";

/**
 * Props for `ContentList`.
 */
export type ContentListProps = SliceComponentProps<Content.ContentListSlice>;

/**
 * Component for "ContentList" Slices.
 */
const ContentList = ({ slice }: ContentListProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <ContentListComponent {...slice.primary} />
    </section>
  );
};

export default ContentList;
