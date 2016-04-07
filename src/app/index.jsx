import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux-immutable';
import { Map } from 'immutable';

import Recipe from './recipes/recipe-component';
import Focus from './focus/focus-component';
import reducer from './reducer';
import recipe from './example-recipe';
import { setRecipe } from './recipes/recipe-actions'

const store = createStore(reducer, Map());

store.dispatch(setRecipe(recipe));

const PassDownChildren = ({ children }) => children;

const routes = <Route component={PassDownChildren}>
  <Route path='/focus' component={Focus} />
  <Route path='/' component={Recipe} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
