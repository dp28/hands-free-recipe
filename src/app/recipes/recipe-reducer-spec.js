import { fromJS } from 'immutable';
import { expect } from '../../test-helper';

import recipeReducer from './recipe-reducer';
import { SET_RECIPE, setRecipe } from './recipe-actions';

describe('recipeReducer', () => {

  describe(`handling ${SET_RECIPE} actions`, () => {

    const recipe = {
      title: 'Hog roast',
      ingredients: ['1 apple', '1 pig'],
      instructions: ['Put apple in pig\'s mouth', 'Roast pig']
    };
    const action = setRecipe(recipe);

    it('with an undefined initial state returns the new state with an immutable recipe', () => {
      const nextState = recipeReducer(undefined, action);
      expect(nextState).to.equal(fromJS(recipe));
    });

    it('with an existing recipe returns an immutable version of the new recipe', () => {
      const existingRecipe = { title: 'toast', ingredients: ['bread'], instructions: ['toast'] };
      const nextState = recipeReducer(fromJS(existingRecipe), action);
      expect(nextState).to.equal(fromJS(recipe));
    });
  });
});
