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
  }
};

type Props = {
  previewImage: string
};

type State = {
  // elementWidth: number,
  // debounced: boolean,
  hovered: boolean
  // shouldUpdate: boolean
};

const Overlay = () => (
  <div style={styles.overlay}>
    <div>
      <p>How it's made</p>
    </div>
    <div>
      <p>Show me</p>
    </div>
  </div>
);

class Preview extends Component<Props, State> {
  state = {
    // elementWidth: 600,
    // debounced: false,
    hovered: false
    // shouldUpdate: false
  };
  // aspectRatio = 1034 / 670;

  // componentDidMount() {
  //   window.addEventListener('resize', this.notifyOfResize);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('resize');
  // }

  // /**
  //  * Ignore updates to debounced state, or should update
  //  * Both are just used for limiting state updates
  //  * @param {*} _
  //  * @param {*} nextState
  //  */
  // shouldComponentUpdate(_, nextState: State) {
  //   return (
  //     nextState.debounced === this.state.debounced &&
  //     nextState.shouldUpdate === this.state.shouldUpdate
  //   );
  // }

  // debounce() {
  //   this.setState({ debounced: true });
  //   setTimeout(this.allowUpdate, 1500);
  // }

  // notifyOfResize = () => {
  //   if (!this.state.debounced) {
  //     this.updateWidth();
  //     this.debounce();
  //   } else {
  //     this.setState({ shouldUpdate: true });
  //   }
  // };

  // allowUpdate = () => {
  //   if (this.state.shouldUpdate) {
  //     this.updateWidth();
  //     this.debounce();
  //   } else {
  //     this.setState({ debounced: false });
  //   }
  //   this.setState({ shouldUpdate: false });
  // };

  // updateWidth = () => {
  //   const elementWidth = this.container && this.container.offsetWidth;
  //   this.setState({ elementWidth });
  // };

  // ref={(el) => {
  //   if (!this.container) {
  //     this.container = el;
  //     this.updateWidth();
  //   }
  // }}

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
        </svg>
      </div>
    );
  }
}

export default Radium(Preview);
