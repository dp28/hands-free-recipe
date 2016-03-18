import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer'
import App from './components/app';
import Recipe from './components/recipe';
import FocusPage from './components/focus-page';

const store = createStore(reducer);

store.dispatch({
  type: 'SET_RECIPE',
  recipe: {
    title: 'Hog roast',
    ingredients: ['1 apple', '1 pig'],
    instructions: ['Put apple in pig\'s mouth', 'Roast pig']
  }
});

const routes = <Route component={App}>
  <Route path='/focus' component={FocusPage} />
  <Route path='/' component={Recipe} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
