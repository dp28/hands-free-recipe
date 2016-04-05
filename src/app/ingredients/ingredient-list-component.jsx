import React from 'react'
import { Link } from 'react-router';
import { connect } from 'react-redux';

import FocusButton from '../focus-button/focus-button-component'

export const IngredientList = ({ ingredients }) => (
  <ul>
  {
    ingredients.map((ingredient, index) =>
      <li key={ingredient}>
        <FocusButton focusOn={['recipe', 'ingredients', index]} />
        {ingredient}
      </li>
    )
  }
  </ul>
);

const mapStateToProps = (state) => ({ recipe: state.get('recipe') })

export default connect(mapStateToProps)(IngredientList);
