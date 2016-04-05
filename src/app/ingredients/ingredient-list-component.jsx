import React from 'react'
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { setFocus } from '../focus/focus-actions';

export const IngredientList = ({ ingredients, setFocus }) => (
  <ul>
  {
    ingredients.map((ingredient, index) =>
      <li key={ingredient}>
        <Link to='focus' onClick={setFocus(index)}> Focus </Link>
        {ingredient}
      </li>
    )
  }
  </ul>
);

const mapStateToProps = (state) => ({ recipe: state.get('recipe') })

const mapDispatchToProps = (dispatch) => {
  return {
    setFocus: (index) => () => dispatch(setFocus(['recipe', 'ingredients', index]))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientList);
