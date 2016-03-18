import { fromJS } from 'immutable';
import { expect } from '../test-helper';

import reducer from '../../src/app/reducer';

describe('reducer', () => {

  describe('handling SET_RECIPE actions', () => {
    const SET_RECIPE = 'SET_RECIPE';

    const recipe = {
      title: 'Hog roast',
      ingredients: ['1 apple', '1 pig'],
      instructions: ['Put apple in pig\'s mouth', 'Roast pig']
    };

    const recipeAndNoFocus = fromJS({ focus: [], recipe });

    it('with an undefined inital state returns the new state with an immutable recipe', () => {
      const action = { type: SET_RECIPE, recipe };
      const nextState = reducer(undefined, action);

      expect(nextState).to.equal(recipeAndNoFocus);
    });

    it('with an existing recipe returns an immutable version of the new recipe', () => {
      const action = { type: SET_RECIPE, recipe: recipe };
      const existingRecipe = { title: 'toast', ingredients: ['bread'], instructions: ['toast'] };
      const nextState = reducer(fromJS({ focus: [], recipe: existingRecipe }), action);

      expect(nextState).to.equal(recipeAndNoFocus);
    });
  });
});
