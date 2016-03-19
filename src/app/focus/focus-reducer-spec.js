import { fromJS } from 'immutable';
import { expect } from '../../test-helper';

import focusReducer from './focus-reducer';
import { SET_FOCUS, setFocus } from './focus-actions';

describe('focusReducer', () => {

  describe(`handling ${SET_FOCUS} actions`, () => {
    const focus = ['recipe', 'instructions', 0];
    const action = setFocus(focus);

    it('with an undefined inital state returns the new state with an immutable focus', () => {
      const nextState = focusReducer(undefined, action);
      expect(nextState).to.equal(fromJS(focus));
    });

    it('with an existing focus returns an immutable version of the new focus', () => {
      const existingRecipe = ['recipe', 'ingredients', 2];
      const nextState = focusReducer(fromJS(existingRecipe), action);
      expect(nextState).to.equal(fromJS(focus));
    });
  });
});
