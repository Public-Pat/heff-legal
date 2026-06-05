import { useState, useEffect } from "react";

// Checks whether an image is in range based on the scroll progress (val between 0 and 1), the image index, and the total number of images in the array.
// Example: const isInRange = useRangeChecker(index, scrollProgress, numberOfImages);

const useRangeChecker = (
  index: number,
  scrollProgress: number,
  numberOfImages: number
) => {
  const [isInRange, setIsInRange] = useState(false);

  useEffect(() => {
    const start = index / numberOfImages;
    const end = (index + 1) / numberOfImages;

    if (scrollProgress >= start && scrollProgress <= end) {
      setIsInRange(true);
    } else {
      setIsInRange(false);
    }
  }, [index, scrollProgress, numberOfImages]);

  return isInRange;
};

export default useRangeChecker;

