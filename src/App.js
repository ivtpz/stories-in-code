import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './App.css';

import asyncComponent from './AsyncComponent';

const Home = asyncComponent(() =>
  import('./containers/HomePage.js').then(module => module.default));

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Home} />
      </Router>
    );
  }
}

export default App;
