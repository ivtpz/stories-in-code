import React from 'react';
import Radium from 'radium';
import testImage from '../images/twitterMap.png';

const styles = {
  container: {

  }
};

const Preview = ({ previewImage }) => (
  <div style={styles.container}>
    <img src={testImage} />
  </div>
);

export default Radium(Preview);
