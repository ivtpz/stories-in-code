import React, { Component } from 'react';
import Radium from 'radium';
import Background from '../components/Background';
import Preview from '../components/Preview';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
};

class HomePage extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Background />
          <Preview />
      </div>
    );
  }
}

export default Radium(HomePage);
