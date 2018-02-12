// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store/storeConfig';
import Visualizations from './containers/visualizations';
import asyncComponent from './AsyncComponent';
import './index.css';

// Using asyncComp / import to facilitate code splitting
// Consider switching to <Bundle /> suggeste by React Router team
// to cache component in state and not have to fetch again when returning
// to that route.
const Home = asyncComponent(() =>
  import('./containers/HomePage.js').then(module => module.default)
);

const App = () => (
  <Provider store={store} >
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        {Object.keys(Visualizations).map(routeName => (
          <Route path={`/${routeName}`} component={Visualizations[routeName]} key={routeName} />
        ))}
      </Switch>
    </Router>
  </Provider>
);

export default App;
