import { fromJS } from 'immutable';
import { expect } from '../../test-helper';

import recipeReducer from './recipe-reducer';

describe('recipeReducer', () => {

  describe('handling SET_RECIPE actions', () => {
    const SET_RECIPE = 'SET_RECIPE';

    const recipe = {
      title: 'Hog roast',
      ingredients: ['1 apple', '1 pig'],
      instructions: ['Put apple in pig\'s mouth', 'Roast pig']
    };

    it('with an undefined inital state returns the new state with an immutable recipe', () => {
      const action = { type: SET_RECIPE, recipe };
      const nextState = recipeReducer(undefined, action);

      expect(nextState).to.equal(fromJS(recipe));
    });

    it('with an existing recipe returns an immutable version of the new recipe', () => {
      const action = { type: SET_RECIPE, recipe: recipe };
      const existingRecipe = { title: 'toast', ingredients: ['bread'], instructions: ['toast'] };
      const nextState = recipeReducer(fromJS(existingRecipe), action);

      expect(nextState).to.equal(fromJS(recipe));
    });
  });
});
