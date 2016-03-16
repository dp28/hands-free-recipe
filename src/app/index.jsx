import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './components/app';
import Recipe from './components/recipe';
import FocusPage from './components/focus-page';

const routes = <Route component={App}>
  <Route path='/focus' component={FocusPage} />
  <Route path='/' component={Recipe} />
</Route>;

ReactDOM.render(
  <Router history={hashHistory}>{routes}</Router>,
  document.getElementById('app')
);
