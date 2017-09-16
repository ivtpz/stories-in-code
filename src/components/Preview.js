// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import testImage from '../images/twitterMap.png';
import { colors } from '../colors';

const styles = {
  container: {
    width: '50%',
    position: 'relative'
  },
  svgBox: {
    width: '100%',
    height: '100%'
  },
  border: {
    strokeDasharray: '640 3040',
    strokeDashoffset: '-1900',
    strokeWidth: '8px',
    fill: 'white',
    fillOpacity: 0,
    stroke: colors.turquoiseChalk,
    transition:
      'stroke-width 1s, stroke-dashoffset 1s, stroke-dasharray 1s, fill 1s, fill-opacity 1s'
  },
  hoveredBorder: {
    strokeWidth: 3,
    strokeDashoffset: 0,
    strokeDasharray: 3410,
    fill: 'black',
    fillOpacity: '0.5'
  },
  overlay: {
    position: 'absolute',
    display: 'flex',
    color: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  text: {
    fontFamily: 'Roboto Condensed',
    fontSize: 32,
    lineHeight: 32,
    letterSpacing: 8,
    color: '#fff'
  },
  line: {
    stroke: 'white',
    strokeWidth: 5,
    strokeDasharray: '580 580',
    strokeDashoffset: 0,
    transition: 'all 1s'
  },
  hiddenLine: {
    strokeDasharray: '0 580',
    strokeDashoffset: -290
  }
};

type Props = {
  previewImage: string
};

type State = {
  hovered: boolean
};

const Overlay = () => (
  <div style={styles.overlay}>
    <div style={styles.text}>SHOW ME</div>
    <div style={styles.text}>HOW IT'S MADE</div>
  </div>
);

class Preview extends Component<Props, State> {
  state = {
    hovered: false
  };

  render() {
    return (
      <div
        style={styles.container}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
      >
        <Overlay />
        <svg viewBox="-20 -20 1040 670" style={styles.svgBox}>
          <image xlinkHref={testImage} />
          <rect
            style={this.state.hovered ? [styles.border, styles.hoveredBorder] : styles.border}
            x="-18"
            y="-18"
            rx="4"
            ry="4"
            width="1030px"
            height="666px"
          />
          <line
            x1="500"
            x2="500"
            y1="30"
            y2="610"
            style={this.state.hovered ? styles.line : [styles.line, styles.hiddenLine]}
          />
        </svg>
      </div>
    );
  }
}

export default Radium(Preview);
