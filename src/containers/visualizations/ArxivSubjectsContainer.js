import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'material-ui/Slider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import LandingVisual from './ArxivSubjectsVisual';

import { getSubjectCountData } from '../../actions/arxiv';
import { initialize, destroy } from '../../actions/d3Actions';
import { updateD3YearSlider, setSliderDrag } from '../../actions/materialui';

import { colors, theme } from './themes/arxivSubjects';

const styles = {
  header: {
    color: 'rgb(77, 194, 202)',
    fontSize: '60px',
    textAlign: 'center',
    textShadow: '1px 2px grey',
    marginBottom: 20
  },
  slideContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  description: {
    textAlign: 'center',
    margin: 0
  },
  slider: {
    width: '65%'
  },
  sliderTitle: {
    color: colors.PrimaryDark
  },
  year: {
    color: colors.PrimaryBright
  }
};

class LandingPage extends Component {
  componentDidMount() {
    this.props.fetch(this.props.sliderValue);
  }

  componentWillReceiveProps({ dragging, sliderValue }) {
    const { prevSliderValue, isFetching, fetch } = this.props;
    if (!isFetching && !dragging && prevSliderValue !== sliderValue) {
      console.log('SHOULD FETCH DATA for ', sliderValue);
      fetch(sliderValue);
    }
  }

  render() {
    const {
      data, initialized,
      setRendered, setDestroyed,
      sliderValue, handleSlide,
      handleDragStart, handleDragStop
    } = this.props;
    const currYear = new Date().getFullYear();
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)} key='mainstyle'>
        <div>
          <h1 style={styles.header} >Papers on the Arxiv</h1>
          <p style={styles.description}>An aggregation of all papers published on the Arxiv</p>
          <p style={styles.description}>Scroll through the years to see trends in academic research</p>
          <p style={{ ...styles.description, marginBottom: 10 }}>Click a subject for more detail</p>
          <LandingVisual
            data={data}
            width={650}
            height={650}
            options={{
              rendered: initialized,
              setRendered,
              setDestroyed
            }}
          />
          <div style={styles.slideContainer}>
            {sliderValue === currYear ?
              <div style={styles.sliderTitle}>
              Papers published between <span style={styles.year}>1995</span> and <span style={styles.year}>{currYear}</span>
              </div> :
              <div style={styles.sliderTitle}>
              Papers published in <span style={styles.year}>{sliderValue}</span>
              </div>}
            <Slider
              min={1995}
              step={1}
              max={currYear}
              value={sliderValue}
              onChange={handleSlide}
              onDragStop={handleDragStop}
              onDragStart={handleDragStart}
              style={styles.slider}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  data: state.arxiv.metaData,
  isFetching: state.arxiv.fetching,
  prevSliderValue: state.arxiv.metaDataYear,
  initialized: state.d3.initialized,
  sliderValue: state.materialUi.slider.value,
  dragging: state.materialUi.slider.dragging
});

const mapDispatchToProps = dispatch => ({
  fetch: year => dispatch(getSubjectCountData(year)),
  setRendered: () => dispatch(initialize()),
  setDestroyed: () => dispatch(destroy()),
  handleSlide: (e, value) => dispatch(updateD3YearSlider(value)),
  handleDragStart: () => dispatch(setSliderDrag(true)),
  handleDragStop: () => dispatch(setSliderDrag(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
