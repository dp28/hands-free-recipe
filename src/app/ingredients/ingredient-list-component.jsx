import React from 'react'
import { connect } from 'react-redux';

import FocusButton from '../focus-button/focus-button-component';

const ingredientsLocation = ['recipe', 'ingredients'];

export const IngredientList = ({ ingredients }) => (
  <ul>
  {
    ingredients.map((ingredient, index) =>
      <li key={index}>
        <FocusButton focusOn={[...ingredientsLocation, index]} />
        {ingredient}
      </li>
    )
  }
  </ul>
);

const mapStateToProps = (state) => ({ ingredients: state.getIn(ingredientsLocation) });

export default connect(mapStateToProps)(IngredientList);
