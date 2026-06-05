import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import CardsComponent from "@/components/slices/Cards/Cards";

/**
 * Props for `Cards`.
 */
export type CardsProps = SliceComponentProps<Content.CardsSlice>;

/**
 * Component for "Cards" Slices.
 */
const Cards: FC<CardsProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <CardsComponent {...slice.primary} />
    </section>
  );
};

export default Cards;
