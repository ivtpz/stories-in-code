import React from 'react';
import Radium from 'radium';
import { colors } from '../colors';

const ScrollArrow = ({ additionalStyles }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="260.636"
    height="128.52"
    viewBox="0 0 244.3461 120.4872"
  >
    <defs>
      <filter x="-.15" width="1.3" y="-.15" height="1.3" id="a" colorInterpolationFilters="sRGB">
        <feTurbulence numOctaves="5" baseFrequency="0.08 0.175" seed="25" />
        <feColorMatrix result="result5" values="1 1 1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0" />
        <feComposite in="SourceGraphic" operator="in" in2="result5" />
        <feMorphology operator="dilate" radius=".65" result="result3" />
        <feTurbulence numOctaves="7" baseFrequency="0.05 0.09" type="fractalNoise" seed="25" />
        <feGaussianBlur stdDeviation="2" result="result7" />
        <feDisplacementMap
          in="result3"
          xChannelSelector="R"
          yChannelSelector="G"
          scale="5"
          result="result4"
          in2="result7"
        />
        <feFlood floodOpacity="1" floodColor={colors.whiteChalk} />
        <feComposite k3=".7" k1=".7" result="result2" operator="arithmetic" in2="result4" />
        <feComposite
          k2="1"
          in="result2"
          operator="arithmetic"
          in2="SourceAlpha"
          k1="1"
          result="result6"
        />
        <feBlend mode="multiply" in2="result6" in="result6" />
      </filter>
    </defs>
    <g fill="none" strokeWidth="2.2" style={additionalStyles}>
      <path
        d="M192.94 572.54c48.486 22.223 105.055 71.72 105.055 71.72v-1.01"
        filter="url(#a)"
        transform="translate(-177.18 -534.774)"
      />
      <path
        d="M405.36 572.782c-48.488 22.223-105.057 71.72-105.057 71.72v-1.01"
        filter="url(#a)"
        transform="translate(-177.18 -534.774)"
      />
      <path
        d="M193.348 545.532c48.488 22.223 105.056 71.72 105.056 71.72v-1.01"
        filter="url(#a)"
        transform="translate(-177.18 -534.774)"
      />
      <path
        d="M405.769 545.774c-48.488 22.224-105.056 71.721-105.056 71.721v-1.01"
        filter="url(#a)"
        transform="translate(-177.18 -534.774)"
      />
    </g>
  </svg>
);

export default Radium(ScrollArrow);
