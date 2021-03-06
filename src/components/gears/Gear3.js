import React from 'react';
import Radium from 'radium';

const Gear3 = ({ refFunc, additionalStyles }) => (
  <svg
    style={additionalStyles}
    ref={refFunc}
    viewBox="-0.1 -0.1 21 21"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="filter2" height="2" width="2">
        <feTurbulence
          baseFrequency="0.5"
          numOctaves="10"
          type="fractalNoise"
        />
        <feDisplacementMap
          scale="0.6"
          xChannelSelector="R"
          in="SourceGraphic"
        />
      </filter>
    </defs>
    <g data-name="Layer 2">
      <path
        fill="none"
        filter="url(#filter2)"
        strokeWidth=".3"
        d="M17 13.09a1.27 1.27 0 0 1 .83-.74 18.62 18.62 0 0 0 2.83-.92V9.16l-2.84-.83a1.27 1.27 0 0 1-.82-.74 1.27 1.27 0 0 1 .07-1.11 18.71 18.71 0 0 0 1.37-2.68l-1.61-1.6a17.84 17.84 0 0 0-2.6 1.39 1.27 1.27 0 0 1-1.13.08 1.27 1.27 0 0 1-.73-.79L11.43 0H9.16l-.83 2.85a1.27 1.27 0 0 1-.73.82 1.27 1.27 0 0 1-1.11-.06A18.43 18.43 0 0 0 3.8 2.26L2.19 3.87a17.59 17.59 0 0 0 1.39 2.59 1.27 1.27 0 0 1 .08 1.13 1.27 1.27 0 0 1-.83.74A19.24 19.24 0 0 0 0 9.25v2.27a17.58 17.58 0 0 0 2.82.85 1.27 1.27 0 0 1 .79 1.85 18.89 18.89 0 0 0-1.35 2.65l1.61 1.63a18.29 18.29 0 0 0 2.6-1.39A1.27 1.27 0 0 1 7.59 17a1.27 1.27 0 0 1 .74.83 18.46 18.46 0 0 0 .92 2.83h2.27a17.86 17.86 0 0 0 .85-2.81 1.27 1.27 0 0 1 .75-.86 1.27 1.27 0 0 1 1.11.07 18.41 18.41 0 0 0 2.65 1.35l1.61-1.61a17.55 17.55 0 0 0-1.39-2.59 1.27 1.27 0 0 1-.1-1.11zm-6.69 2.23a5 5 0 1 1 5-5 5 5 0 0 1-4.96 5.01z"
        data-name="Layer 1"
      />
    </g>
  </svg>
);

export default Radium(Gear3);
