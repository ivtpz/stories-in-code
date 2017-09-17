import React from 'react';
import Radium from 'radium';

const GraphIcon = ({ additionalStyles }) => (
  <svg
    style={additionalStyles}
    strokeWidth="8"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 312.1577 312.38572"
  >
    <g transform="translate(-215.307 -169.955)" fill="none">
      <circle cx="313.429" cy="272.648" r="65.714" />
      <circle cx="313.429" cy="272.076" r="38.571" />
      <path d="M347.714 251.934l22.143-15M352.714 279.79l25.715 4.286M304.143 309.076l-7.857 27.858" />
      <path d="M371.428 172.361a154.286 154.286 0 0 0-154.285 154.287 154.286 154.286 0 0 0 70.945 129.645v-97.27h50.252v117.94a154.286 154.286 0 0 0 11.738 2.3V339.583h49.844V478.18a154.286 154.286 0 0 0 13.988-3.36V284.13h49.322V450.31a154.286 154.286 0 0 0 62.483-123.663 154.286 154.286 0 0 0-154.287-154.287z" />
      <ellipse cx="371.143" cy="326.148" rx="154.305" ry="154.662" />
      <circle cx="312.714" cy="420.219" r="6.429" />
      <circle cx="438" cy="360.934" r="6.429" />
      <circle cx="374.286" cy="353.791" r="6.429" />
      <path d="M317.857 416.648L370 358.79M380.714 355.22l50 5" />
    </g>
  </svg>
);

export default Radium(GraphIcon);
