import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IngredientList from '../ingredients/ingredient-list-component';
import InstructionList from '../instructions/instruction-list-component';

export const Recipe = ({ recipe }) => (
  <div>
    <h1>{recipe.get('title')}</h1>
    <IngredientList />
    <InstructionList />
  </div>
);

const mapStateToProps = (state) => ({ recipe: state.get('recipe') })

export default connect(mapStateToProps)(Recipe);
