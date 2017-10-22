import asyncComponent from '../../AsyncComponent';

const TwitterMoods = asyncComponent(() => import('./TwitterMoods').then(module => module.default));

export default {
  'twitter-mood-map': TwitterMoods
};
