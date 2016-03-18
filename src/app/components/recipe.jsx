import React from 'react';
import { connect } from 'react-redux';

import IngredientList from './ingredient-list';
import InstructionList from './instruction-list';

export const Recipe = ({ recipe }) => (
  <div>
    <h1>{recipe.get('title')}</h1>
    <IngredientList ingredients={recipe.get('ingredients')} />
    <InstructionList instructions={recipe.get('instructions')} />
  </div>
);

const mapStateToProps = (state) => ({ recipe: state })

export const RecipeContainer = connect(mapStateToProps)(Recipe);
