// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import testImage from '../images/twitterMap.png';
import { colors } from '../colors';

const styles = {
  container: {
    flexBasis: 500,
    position: 'relative',
    margin: 20
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
  textContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    color: '#fff',
    padding: 10,
    height: '100%',
    ':hover': {
      color: colors.turquoiseChalk,
      cursor: 'pointer'
    }
  },
  text: {
    fontFamily: 'Roboto Condensed',
    fontSize: 32,
    letterSpacing: 8,
    textAlign: 'center',
    transition: 'color .5s'
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
        {this.state.hovered && (
          <div style={styles.overlay}>
            <div key="show_me_cont" style={styles.textContainer}>
              <div key="show_me" style={styles.text}>
                SHOW ME
              </div>
            </div>
            <div key="how_its_made_cont" style={styles.textContainer}>
              <div key="how_its_made" style={styles.text}>
                HOW IT'S MADE
              </div>
            </div>
          </div>
        )}
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
