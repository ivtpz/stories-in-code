/* global Linear, window */
import React, { Component } from 'react';
import Radium from 'radium';
import TweenMax from 'gsap';

import Logo from './logo/Logo';
import Defs from './logo/Defs';
import * as Gears from './gears';
import { colors } from '../colors';
import ScrollArrow from '../icons/scrollArrow';
import play from '../icons/play.svg';
import pause from '../icons/pause.svg';

const styles = {
  container: {
    position: 'relative',
    margin: 'auto',
    width: 950,
    height: 500,
    zIndex: -1
  },
  logo: {
    position: 'absolute',
    top: 23,
    left: 264
  },
  logoGear: {
    position: 'absolute',
    top: 89,
    left: 392,
    stroke: colors.blueChalk
  },
  gear1: {
    position: 'absolute',
    left: 316,
    top: 361,
    stroke: colors.pinkChalk
  },
  gear2: {
    position: 'absolute',
    left: 640,
    top: 169,
    stroke: colors.turquoiseChalk
  },
  gear3: {
    width: 200,
    height: 200,
    position: 'absolute',
    left: 112,
    top: 106,
    stroke: colors.purpleChalk
  },
  gear4: {
    position: 'absolute',
    top: 390,
    left: 224,
    stroke: colors.whiteChalk
  },
  gear5: {
    position: 'absolute',
    top: 258,
    left: 649,
    stroke: colors.yellowChalk
  },
  gear6: {
    position: 'absolute',
    top: 247,
    left: 0,
    stroke: colors.turquoiseChalk
  },
  playPause: {
    position: 'absolute',
    height: 30,
    width: 30,
    margin: 10
  },
  playPauseIcon: {
    width: '100%'
  },
  scrollArrowHidden: {
    strokeDasharray: '0, 150'
  },
  arrowContainer: {
    position: 'absolute',
    height: '100%',
    maxHeight: 500,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginLeft: 40
  },
  scrollArrow: {
    stroke: colors.whiteChalk,
    strokeDasharray: 150,
    transition: 'all 2s ease-in'
  }
};

const rotation = direction => ({
  rotation: 360 * direction,
  repeat: -1,
  ease: Linear.easeNone
});

class Background extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false,
      blockAnimation: false,
      showScrollArrow: false
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ showScrollArrow: true }), 100);
    window.addEventListener('scroll', () => {
      // const { scrollTop } = e.srcElement.scrollingElement;
      // if (scrollTop === 0 && !this.state.blockAnimation) {
      //   this.changeAnimation(false);
      // } else {
      if (!this.state.paused) {
        this.changeAnimation(true);
      }
      if (this.state.showScrollArrow) {
        this.setState({ showScrollArrow: false });
      }
      // }
    });

    const base = 24 / 19;
    this.gearRotationAnimations = Object.keys(Gears).map(gear =>
      TweenMax.to(this[gear], base * Gears[gear].spokes, rotation(Gears[gear].direction))
    );
  }

  changeAnimation = (paused) => {
    if (this.gearRotationAnimations) {
      this.gearRotationAnimations.forEach(a => a.paused(paused));
      this.setState({ paused });
    }
  };

  render() {
    return (
      <div>
        <div
          style={styles.playPause}
          onClick={() => {
            this.changeAnimation(!this.state.paused);
            this.setState({ blockAnimation: !this.state.paused });
          }}
        >
          {this.state.paused ? (
            <img src={play} style={styles.playPauseIcon} />
          ) : (
            <img src={pause} style={styles.playPauseIcon} />
          )}
        </div>
        <div style={styles.arrowContainer}>
          <ScrollArrow
            additionalStyles={
              this.state.showScrollArrow ? (
                styles.scrollArrow
              ) : (
                [styles.scrollArrow, styles.scrollArrowHidden]
              )
            }
          />
        </div>
        <div style={styles.container}>
          <Defs />
          <Logo additionalStyles={styles.logo} />
          {Object.keys(Gears).map(gear =>
            React.createElement(Gears[gear], {
              additionalStyles: styles[gear],
              refFunc: (el) => {
                this[gear] = el;
              },
              key: Gears[gear].displayName
            })
          )}
        </div>
      </div>
    );
  }
}

export default Radium(Background);
