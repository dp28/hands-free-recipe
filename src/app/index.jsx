import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux-immutable';
import { Map } from 'immutable';

import Recipe from './recipes/recipe-component';
import Focus from './focus/focus-component';
import recipe from './recipes/recipe-reducer';
import focus from './focus/focus-reducer';

const reducer = combineReducers({ recipe, focus });
const store = createStore(reducer, Map());

store.dispatch({
  type: 'SET_RECIPE',
  recipe: {
    title: 'Hog roast',
    ingredients: ['1 apple', '1 pig'],
    instructions: ['Put apple in pig\'s mouth', 'Roast pig']
  }
});

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
