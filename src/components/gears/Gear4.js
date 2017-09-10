import React from 'react';
import Radium from 'radium';

const Gear4 = ({ refFunc, additionalStyles }) => (
  <svg
    style={additionalStyles}
    ref={refFunc}
    height="142"
    width="142"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fill="none"
      strokeWidth=".7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M251.244 2.637l-.93 3.299a10.42 10.42 0 0 0-4.408 2.556l-3.338-.846-1.904 3.297 2.406 2.5a10.42 10.42 0 0 0-.316 2.502 10.42 10.42 0 0 0 .338 2.573l-2.428 2.492 1.904 3.297 3.399-.842a10.42 10.42 0 0 0 4.314 2.486l.963 3.412h3.807l.984-3.406a10.42 10.42 0 0 0 4.346-2.5l3.43.85 1.902-3.297-2.443-2.51a10.42 10.42 0 0 0 .326-2.555 10.42 10.42 0 0 0-.31-2.478l2.427-2.524-1.902-3.297-3.35.85a10.42 10.42 0 0 0-4.463-2.58l-.947-3.28h-3.807zm1.932 9.42a3.888 3.888 0 0 1 3.888 3.888 3.888 3.888 0 0 1-3.888 3.889 3.888 3.888 0 0 1-3.889-3.889 3.888 3.888 0 0 1 3.889-3.888z"
        filter="url(#filter2)"
        transform="translate(-236.32 .055) scale(.99657)"
      />
      <path
        d="M253.176 7.956a7.989 7.989 0 1 0 0 15.978 7.989 7.989 0 0 0 0-15.978z"
        filter="url(#filter2)"
        transform="translate(-236.32 .055) scale(.99657)"
      />
    </g>
  </svg>
);

export default Radium(Gear4);
