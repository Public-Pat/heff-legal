import * as React from "react";
const OpenImage = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 44 44" // Defines the coordinate system
    {...props}
  >
    <circle cx={22} cy={22} r={22} fill="#fff" />
    <g
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#a)"
    >
      <path d="M26 12h6v6M24 20l8-8M18 32h-6v-6M20 24l-8 8" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M6 6h32v32H6z" />
      </clipPath>
    </defs>
  </svg>
);
export default OpenImage;

