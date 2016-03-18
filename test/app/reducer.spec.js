import { Map, fromJS } from 'immutable';
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

    it('with immutable data returns the state with an immutable recipe', () => {
      const action = { type: SET_RECIPE, recipe: Map().merge(recipe) };
      const nextState = reducer(Map(), action);

      expect(nextState).to.equal(fromJS(recipe));
    });

    it('with plain JS data returns the state with an immutable recipe', () => {
      const action = { type: SET_RECIPE, recipe };
      const nextState = reducer(Map(), action);

      expect(nextState).to.equal(fromJS(recipe));
    });

    it('with an undefined inital state returns the new state with an immutable recipe', () => {
      const action = { type: SET_RECIPE, recipe };
      const nextState = reducer(undefined, action);

      expect(nextState).to.equal(fromJS(recipe));
    });
  });
});
