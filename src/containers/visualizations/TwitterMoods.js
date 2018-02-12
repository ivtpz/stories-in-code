import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Radium from 'radium';
import d3Wrap from 'react-d3-wrap';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import { flattenDeep } from 'lodash';
import { homeIcon } from '../../theme/sharedStyles';

const styles = {
  title: {
    width: 'auto',
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    fontSize: '3em',
    fontWeight: 'bolder',
    fontFamily: 'serif',
    color: 'darkcyan'
  },
  updated: {
    textAlign: 'center',
    color: 'gray'
  },
  description: {
    textAlign: 'center',
    margin: 0
  }
};

class TwitterMoods extends Component {
  render() {
    return (
      <div>
        <div style={styles.title}>National Mood Map</div>
        <p id="updated" style={styles.updated}></p>
        <p style={styles.description}>A mood ring for the USA</p>
        <p style={styles.description}>Based off of sentiment analysis of trending Tweets</p>
        <div id="mapkey"></div>
        <Map
          width={960}
          height={660}
        />
      </div>
    );
  }
}

const Map = d3Wrap({
  initialize(svg, data, options) {
    d3.select(svg).selectAll('*').remove();
  },
  update(SVG, data, options) {
    /* ======================= MAP ======================= */
    const svg = d3.select(SVG);
    svg.attr('style', 'display:block; margin:auto;');
    const months = {
      0: 'Jan',
      1: 'Feb',
      2: 'Mar',
      3: 'Apr',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'Aug',
      8: 'Sept',
      9: 'Oct',
      10: 'Nov',
      11: 'Dec'
    };

    const path = d3.geoPath();

    d3.json('https://s3.eu-west-2.amazonaws.com/storiesincode.com/stateTweetKeywords.json', (err, keywords) => {
      const date = new Date(keywords.updated);
      d3.select('#updated')
        .text(`Last updated ${months[date.getMonth()]} ${date.getDate()} at ${date.getHours()}:${date.getMinutes()}`);
      if (err) throw err;
      d3.json('https://s3.eu-west-2.amazonaws.com/storiesincode.com/us-quant.json', (error, us) => {
        if (error) throw error;
        const states = svg.append('g')
          .attr('class', 'states')
          .selectAll('path')
          .data(topojson.feature(us, us.objects.states).features)
          .enter();

        function getCoor(i, coors) {
          return coors.length === 2 ? coors[i] : coors.map(getCoor.bind(null, i));
        }

        function getRange(arr) {
          return d3.max(arr) - d3.min(arr);
        }

        window.onerror = e => console.log(e);
        states.each((d, i) => {
          // console.log(d.properties)
          if (d.geometry) {
            const ps = flattenDeep(d.geometry.coordinates);
            const xs = ps.filter((__, i) => !(i % 2));
            const ys = ps.filter((__, i) => (i % 2));
            const width = Math.ceil(getRange(xs));
            const height = Math.ceil(getRange(ys));
            const size = Math.max(width, height);

            const pat = svg.append('defs')
              .selectAll('pattern')
              .data([d])
              .enter()
              .append('pattern')
              .attr('id', d.properties.STUSPS)
              .attr('x', 0)
              .attr('y', 0)
              .attr('width', 1)
              .attr('height', 1);
            pat.append('image')
              .attr('xlink:href', d => `https://s3.eu-west-2.amazonaws.com/storiesincode.com/${d.properties.STUSPS}.jpg`);
          }
        });
        states.append('path')
          .attr('d', path)
          .attr('fill', d => `url(#${d.properties.STUSPS})`)
          .append('title')
          .text((d) => {
            const c = d.properties.STUSPS;
            if (keywords[c] && keywords[c].length) {
              return keywords[c].join(', ');
            }
            return '?';
          });
      });
    });

    /* ============================= KEY =============================== */
    const shadesInRange = 10;

    const pieceWidth = 80;

    const fullHeight = 400;


    const scales = [
      {
        Anger: [d3.rgb(250, 10, 0), d3.rgb(130, 10, 0)]
      },
      {
        Joy: [d3.rgb(255, 255, 0), d3.rgb(255, 186, 20)]
      },
      {
        Disgust: [d3.rgb(0, 240, 10), d3.rgb(20, 130, 60)]
      },
      {
        Sadness: [d3.rgb(0, 150, 255), d3.rgb(0, 10, 255)]
      },
      {
        Fear: [d3.rgb(170, 140, 210), d3.rgb(135, 75, 235)]
      }
    ];

    const colors = scales.map((scale) => { // eslint-disable-line import/prefer-default-export
      const key = Object.keys(scale)[0];
      return {
        [key]: d3.scaleLinear()
          .domain([1, shadesInRange])
          .range(scale[key].reverse())
          .interpolate(d3.interpolateHcl)
      };
    });
    const range = (end) => {
      let curr = 1;
      const arr = [];
      while (curr <= end) {
        arr.push(curr++);
      }
      return arr;
    };
    const baseData = range(shadesInRange);

    const colorList = scales.map(s => Object.keys(s)[0]);

    let colorData = colorList.map(c => baseData.map(d => [c, d]));

    colorData = colorData.reduce((a, d) => a.concat(d), []);

    d3.select('#mapkey')
      .attr('style', `width: ${pieceWidth}px; position: absolute; left: 80px; top: 170px;`)
      .selectAll('div')
      .data(colorData)
      .enter()
      .append('div')
      .attr('id', (d, j) => ((j % shadesInRange) === Math.floor((shadesInRange) / 2) - 1 ? `title-anchor${Math.floor(j / shadesInRange)}` : `key${j}`))
      .attr('style', (d, j) => {
        const i = Math.floor(j / shadesInRange);
        const b = `background-color: ${colors[i][d[0]](d[1])}`;
        const height = fullHeight / shadesInRange / Object.keys(scales).length;
        const w = `width: ${pieceWidth}px`;
        const h = `height: ${height}px`;
        return [b, w, h].join(';');
      });

    colorList.forEach((mood, i) => {
      d3.select(`#title-anchor${i}`)
        .append('div')
        .attr('style', `position: absolute; width :${pieceWidth}px; text-align: center; color: white; font-size: 1.2em; font-weight: 600;`)
        .text(mood);
    });
  },
  destroy() {

  }
});

export default Radium(TwitterMoods);
