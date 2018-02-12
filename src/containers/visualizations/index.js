import React from 'react';
import { Link } from 'react-router-dom';
import { homeIcon } from '../../theme/sharedStyles';
import asyncComponent from '../../AsyncComponent';

const WithHomeIcon = Component => (
  <div>
    <Link to="/"><i className="fa fa-home" style={homeIcon}></i></Link>
    <Component />
  </div>
);

const TwitterMoods = asyncComponent(() => import('./TwitterMoods').then(module => () => WithHomeIcon(module.default)));
const ArxivSubjects = asyncComponent(() => import('./ArxivSubjectsContainer').then(module => () => WithHomeIcon(module.default)));
const ArxivAuthorConnections = asyncComponent(() => import('./ArxivAuthorConnections').then(module => () => WithHomeIcon(module.default)));

export default {
  'twitter-mood-map': TwitterMoods,
  'arxiv-by-subject': ArxivSubjects,
  'arxiv-author-connections': ArxivAuthorConnections
};
