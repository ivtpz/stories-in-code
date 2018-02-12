import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import * as d3 from 'd3';
import d3Wrap from 'react-d3-wrap';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { theme } from './themes/arxivSubjects';
import SearchField from '../../components/SearchField';
import './styles/ArxivAuthorConnections.css';

import {
  getConnectionDataByAuthor,
  setAuthorQuery,
  getCoAuthorData } from '../../actions/arxiv';
// import dummy from '../helpers/dummyConnectionsD3Data.json';

let g, vis, width, height, d3Colors; // eslint-disable-line

let forceSimulation;

let stateData;

const deepClone = (data) => {
  if (typeof data !== 'object') return data;
  let clone;
  if (!Array.isArray(data)) {
    clone = {};
    Object.keys(data).forEach((k) => {
      clone[k] = deepClone(data[k]);
    });
  } else {
    clone = [];
    data.forEach(d => clone.push(deepClone(d)));
  }
  return clone;
};

const initializeData = (data) => {
  stateData = deepClone(data);
};

const updateData = (newData) => {
  stateData = deepClone(newData);
};

/* eslint-disable no-param-reassign */
const dragstarted = (d) => {
  if (!d3.event.active) forceSimulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
};

const dragged = (d) => {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
};

const dragended = (d) => {
  if (!d3.event.active) forceSimulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
};
/* eslint-enable no-param-reassign */

const colorRanges = [
  ['hsl(235,40%,60%)', 'hsl(245,60%,70%)'],
  ['hsl(228,50%,60%)', 'hsl(235,40%,60%)'],
  ['hsl(200,60%,50%)', 'hsl(228,50%,60%)'],
  ['hsl(190,80%,60%)', 'hsl(200,60%,50%)'],
  ['hsl(180,70%,50%)', 'hsl(190,80%,60%)'],
  ['hsl(152,80%,80%)', 'hsl(160,80%,30%)'],
  ['hsl(40,70%,55%)', 'hsl(50,70%,60%)'],
  ['hsl(25,60%,45%)', 'hsl(20,80%,50%)'],
  ['hsl(0,50%,30%)', 'hsl(0,80%,50%)']
];

const subjects = [
  'Physics',
  'Astrophysics',
  'Classical Physics',
  'Condensed Matter',
  'Non Linear',
  'Math',
  'Statistics',
  'Computer Science',
  'Biology'
];

const ConnectionsVisual = d3Wrap({
  initialize(svg) {
    d3.select(svg).selectAll('*').remove();
  },
  update(svg, data) {
    width = svg.getAttribute('width');
    height = svg.getAttribute('height');
    if (data.length || data.nodes) {
      if (!stateData) {
        // initializeData({ ...data[0] });
        initializeData({ ...data });
      } else {
        // updateData({ ...data[1] });
        updateData({ ...data });
      }

      if (!vis) {
        vis = d3.select(svg).attr('id', 'd3root-authors');


        d3Colors = [
          d3.scaleLinear()
            .domain([-1, 10])
            .range(colorRanges[0])
            .interpolate(d3.interpolateHcl),
          d3.scaleLinear()
            .domain([-1, 6])
            .range(colorRanges[1])
            .interpolate(d3.interpolateHcl),
          d3.scaleLinear()
            .domain([-1, 21])
            .range(colorRanges[2])
            .interpolate(d3.interpolateHcl),
          d3.scaleLinear()
            .domain([-1, 8])
            .range(colorRanges[3])
            .interpolate(d3.interpolateHcl),
          d3.scaleLinear()
            .domain([-1, 5])
            .range(colorRanges[4])
            .interpolate(d3.interpolateHcl),
          d3.scaleLinear()
            .domain([-1, 32])
            .range(colorRanges[5])
            .interpolate(d3.interpolateHcl),
          d3.scaleLinear()
            .domain([-1, 6])
            .range(colorRanges[6])
            .interpolate(d3.interpolateHcl),
          d3.scaleLinear()
            .domain([-1, 36])
            .range(colorRanges[7])
            .interpolate(d3.interpolateHcl),
          d3.scaleLinear()
            .domain([-1, 10])
            .range(colorRanges[8])
            .interpolate(d3.interpolateHcl)
        ];
      }

      forceSimulation = d3.forceSimulation()
        .force('link',
          d3.forceLink()
            .distance(50)
            .strength(0.8)
            .id(d => d.id)
        )
        .force('charge',
          d3.forceManyBody()
            .strength(-50)
        )
        .force('center', d3.forceCenter(width / 2, height / 2));

      // ========================= Apply data ============================== //
      // =========================== DEFINE ENTER ========================= //
      vis.selectAll('g').remove();

      const link = vis.append('g')
        .attr('class', 'link')
        .selectAll('line')
        .data(stateData.links)
        .enter()
        .append('line')
        .attr('stroke-width', d => Math.sqrt(d.value));

      const node = vis.append('g')
        .attr('class', 'connection-node')
        .selectAll('circle')
        .data(stateData.nodes)
        .enter()
        .append('circle')
        .attr('r', d => Math.sqrt(d.paperData.length) * 2)
        .attr('fill', (d) => {
          if (d && d.group) {
            const gradient = d3Colors[d.group[0] - 1];
            console.log(gradient);
            return gradient(d.group[1]);
          }
          return 'grey';
        })
        .call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended));

      node.append('title')
        .text(d => d.id);

      const ticked = () => {
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

        node
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);
      };

      forceSimulation
        .nodes(stateData.nodes)
        .on('tick', ticked);

      forceSimulation
        .force('link')
        .links(stateData.links);
      // ========= EXIT ======== Remove old nodes ======================== //
    }
  },
  destroy() {
    d3.select('#d3root-authors').selectAll('*').remove();
  }
});

const keyStyle = {
  width: 140,
  height: 65,
  color: 'white',
  textAlign: 'center',
  fontSize: '24px'
};

const Key = () => (
  <div style={{ width: keyStyle.width + 60 }}>
    {colorRanges.map((range, i) => (
      <div
        style={{ ...keyStyle, background: `linear-gradient(to bottom, ${range[0]} 0%, ${range[1]} 100%)` }}
      >{subjects[i]}</div>
    ))}
  </div>
);

const writeUpStyle = {
  width: 200,
  paddingLeft: 20
};

const WriteUp = () => (
  <div style={writeUpStyle}>
    This visualization shows who has collaborated with who to
    publish papers on <a href="https://arxiv.org" target="_blank">the arXiv</a>.
    <br /><br />
    Enter an author's full name to get started. Clicking the "add collaborators"
    button will add up to 10 authors that have published a paper with one of the
    authors already shown in the visualization.
    <br /><br />
    The size of each author's dot is proportional to the number of papers he or she
    has published. The thickness of the connection line is proportional to the number
    of times those authors have collaborated.
  </div>
);

const styles = {
  container: {
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    color: 'rgb(77, 194, 202)',
    fontSize: '60px',
    textAlign: 'center',
    textShadow: '1px 2px grey',
    marginTop: 0
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconPosition: {
    top: '-23px',
    left: '96%'
  },
  searchContainer: {
    display: 'flex',
    paddingBottom: 10
  },
  button: {
    width: 200,
    paddingBottom: 10
  }
};

// PRIMARY TODOS: test color by subcategory
// get better dummy data
// make sure coauthor fetching works

class ConnectionsVisualPage extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     data: dummy[0]
  //   };
  // }
  // componentDidMount() {
  //   // TODO: get data
  //   setTimeout(() => this.setState({ data: dummy[1] }), 5000);
  // }
  render() {
    const {
      searchAuthor, setQuery,
      data, nextCoAuthors,
      getCoAuthors
    } = this.props;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)} key='mainstyle'>
        <div style={styles.container}>
          <h1 style={styles.header}>Arxiv Author Connections</h1>
          {nextCoAuthors.length ?
            <RaisedButton
              label="Add Collaborators"
              style={styles.button}
              onClick={getCoAuthors} />
            : <div style={styles.searchContainer}>
              <SearchField
                onSearchInput={setQuery}
                search={searchAuthor}
                filter="Author's full name"
              />
            </div>
          }
          <div style={styles.body}>
            <Key />
            <ConnectionsVisual
              data={data}
              width={800}
              height={600}
            />
            <WriteUp />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  data: state.arxiv.authorConnectionData,
  nextCoAuthors: state.arxiv.coAuthors
});

const mapDispatchToProps = dispatch => ({
  searchAuthor: () => dispatch(getConnectionDataByAuthor()),
  setQuery: e => dispatch(setAuthorQuery(e.target.value)),
  getCoAuthors: () => dispatch(getCoAuthorData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(ConnectionsVisualPage));
