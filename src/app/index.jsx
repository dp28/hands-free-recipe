import React from 'react';
import ReactDOM from 'react-dom';
import RecipeApp from './components/recipe-app';

const recipe = {
  title: 'Hog roast',
  ingredients: ['1 apple', '1 pig'],
  instructions: ['Put apple in pig\'s mouth', 'Roast pig']
}

ReactDOM.render(
  <RecipeApp recipe={recipe} />,
  document.getElementById('app')
);
