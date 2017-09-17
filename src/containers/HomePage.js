import React, { Component } from 'react';
import Radium from 'radium';
import Background from '../components/Background';
import Preview from '../components/Preview';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  preview: {
    flexBasis: 300
  }
};

class HomePage extends Component {
  render() {
    return (
      <div>
        <Background />
        <div style={styles.container}>
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
        </div>
      </div>
    );
  }
}

export default Radium(HomePage);
