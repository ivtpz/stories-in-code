// @flow
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import asyncComponent from './AsyncComponent';

// Using asyncComp / import to facilitate code splitting
const Home = asyncComponent(() =>
  import('./containers/HomePage.js').then(module => module.default));
type P = {}
class App extends Component<P> {
  render() {
    return (
      <Router>
        <Route path="/" component={Home} />
      </Router>
    );
  }
}

export default App;
