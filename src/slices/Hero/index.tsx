import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import HeroComponent from "@/components/slices/Hero/Hero";
import HeroTwoColumn from "@/components/slices/HeroTwoColumn/HeroTwoColumn";
import HeroTextFirst from "@/components/slices/HeroTextFirst/HeroTextFirst";
import HeroTextOnly from "@/components/slices/HeroTextOnly/HeroTextOnly";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.variation === "default" && <HeroComponent {...slice.primary} />}
      {slice.variation === "heroTwoColumn" && <HeroTwoColumn {...slice.primary} />}
      {slice.variation === "heroTextFirst" && <HeroTextFirst {...slice.primary} />}
      {slice.variation === "heroTextOnly" && <HeroTextOnly {...slice.primary} />}
    </section>
  );
};

export default Hero;
