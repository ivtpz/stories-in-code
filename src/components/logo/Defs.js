import React from 'react';

const Defs = () => (
  <svg width="0" height="0">
    <defs>
      <filter id="filter" height="2" width="2">
        <feTurbulence baseFrequency="0.5" numOctaves="10" type="fractalNoise" />
        <feDisplacementMap scale="1" xChannelSelector="R" in="SourceGraphic" />
      </filter>
    </defs>
  </svg>
);

export default Defs;
