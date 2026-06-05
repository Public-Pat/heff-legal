import localFont from "next/font/local";

export const ppNeueMontreal = localFont({
  display: "swap",
  fallback: ["sans-serif"],
  preload: true,
  src: [
    {
      path: "../assets/fonts/pp-neue-montreal-regular/PPNeueMontreal-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/pp-neue-montreal-bold/PPNeueMontreal-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-neue-montreal",
});

