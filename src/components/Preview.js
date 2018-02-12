// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Radium from 'radium';
import Graph from '../icons/graph';
import Tools from '../icons/tools';
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
    textDecoration: 'none',
    color: '#fff',
    padding: 10,
    height: '100%',
    ':hover': {
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
  textHovered: {
    color: colors.turquoiseChalk
  },
  icon: {
    width: 120,
    height: 120,
    stroke: colors.whiteChalk,
    fill: colors.whiteChalk,
    transition: 'all .75s ease'
  },
  iconHidden: {
    width: 0,
    height: 0
  },
  image: {
    width: '96%',
    height: '96%'
  },
  line: {
    stroke: colors.whiteChalk,
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
  previewImage: any,
  href: string
};

type State = {
  hovered: boolean,
  showMeHovered: boolean,
  howItsMadeHovered: boolean
};

class Preview extends Component<Props, State> {
  state = {
    hovered: false,
    showMeHovered: false,
    howItsMadeHovered: false
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
            <Link
              to={this.props.href}
              key="show_me_cont"
              style={styles.textContainer}
              onMouseEnter={() => this.setState({ showMeHovered: true })}
              onMouseLeave={() => this.setState({ showMeHovered: false })}
            >
              <div key="show_me" style={this.state.showMeHovered ? [styles.text, styles.textHovered] : styles.text}>
                <span>SHOW ME</span>
                <br />
                <Graph
                  additionalStyles={
                    this.state.showMeHovered ? styles.icon : [styles.icon, styles.iconHidden]
                  }
                />
              </div>
            </Link>
            <div
              key="how_its_made_cont"
              style={styles.textContainer}
              onMouseEnter={() => this.setState({ howItsMadeHovered: true })}
              onMouseLeave={() => this.setState({ howItsMadeHovered: false })}
            >
              <div key="how_its_made" style={this.state.howItsMadeHovered ? [styles.text, styles.textHovered] : styles.text}>
                <span>HOW IT'S MADE</span>
                <br />
                <Tools
                  additionalStyles={
                    this.state.howItsMadeHovered ? styles.icon : [styles.icon, styles.iconHidden]
                  }
                />
              </div>
            </div>
          </div>
        )}
        <svg viewBox="-20 -20 1040 670" style={styles.svgBox}>
          <image xlinkHref={this.props.previewImage} style={styles.image} />
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
