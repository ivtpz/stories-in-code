/* eslint-disable class-methods-use-this */
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
  componentDidMount() {
    document.body.style.backgroundColor = '#313131';
  }
  componentWillUnmount() {
    document.body.style.backgroundColor = 'white';
  }
  render() {
    return (
      <div>
        <Background />
        <div style={styles.container}>
          <Preview href="twitter-mood-map"/>
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
