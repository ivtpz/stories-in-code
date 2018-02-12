/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import Radium from 'radium';
import Background from '../components/Background';
import Preview from '../components/Preview';
import TwitterPreviewImage from '../images/twitterMap.png';
import ArxivSubjects from '../images/arxivSubjects.png';
import ArxivAuthorConnections from '../images/arxivAuthorConnections.png';


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
          <Preview href="twitter-mood-map" previewImage={TwitterPreviewImage} />
          <Preview href="arxiv-by-subject" previewImage={ArxivSubjects} />
          <Preview href="arxiv-author-connections" previewImage={ArxivAuthorConnections}/>
        </div>
      </div>
    );
  }
}

export default Radium(HomePage);
