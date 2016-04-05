import { fromJS } from 'immutable';
import { expect } from '../../test-helper';

import focusReducer from './focus-reducer';
import * as actions from './focus-actions';

describe('focusReducer', () => {
  const fullStateFocusingOn = index => fromJS({ a: ['a', 'b'], focus: ['a', index] });

  describe(`handling ${actions.SET_FOCUS} actions`, () => {
    const focus = ['recipe', 'instructions', 0];
    const action = actions.setFocus(focus);

    it('with an undefined initial state returns the new state with an immutable focus', () => {
      const nextState = focusReducer(undefined, action);
      expect(nextState).to.equal(fromJS(focus));
    });

    it('with an existing focus returns an immutable version of the new focus', () => {
      const existingRecipe = ['recipe', 'ingredients', 2];
      const nextState = focusReducer(fromJS(existingRecipe), action);
      expect(nextState).to.equal(fromJS(focus));
    });
  });

  describe(`handling ${actions.INCREMENT_FOCUS} actions`, () => {
    context('when the current focus does not end in a number', () => {
      it('should not change the current state', () => {
        const fullState = fromJS({ a: ['a', 'b'], focus: ['a'] });
        const currentState = fullState.get('focus');
        const nextState = focusReducer(currentState, actions.incrementFocus(), fullState);
        expect(nextState).to.equal(currentState);
      });
    });

    context('when the current focus does end in a number', () => {
      context('when the next element in the list focused on does exist', () => {
        it('should change the state by incrementing the number', () => {
          const fullState = fullStateFocusingOn(0);
          const currentState = fullState.get('focus');
          const nextState = focusReducer(currentState, actions.incrementFocus(), fullState);
          expect(nextState).to.equal(fullStateFocusingOn(1).get('focus'));
        });
      });

      context('when the next element in the list focused on does not exist', () => {
        it('should not change the state', () => {
          const fullState = fullStateFocusingOn(1);
          const currentState = fullState.get('focus');
          const nextState = focusReducer(currentState, actions.incrementFocus(), fullState);
          expect(nextState).to.equal(currentState);
        });
      });
    });
  });

  describe(`handling ${actions.DECREMENT_FOCUS} actions`, () => {
    context('when the current focus does not end in a number', () => {
      it('should not change the current state', () => {
        const fullState = fromJS({ a: ['a', 'b'], focus: ['a'] });
        const currentState = fullState.get('focus');
        const nextState = focusReducer(currentState, actions.decrementFocus(), fullState);
        expect(nextState).to.equal(currentState);
      });
    });

    context('when the current focus does end in a number', () => {
      context('when the next element in the list focused on does exist', () => {
        it('should change the state by decrementing the number', () => {
          const fullState = fullStateFocusingOn(1);
          const currentState = fullState.get('focus');
          const nextState = focusReducer(currentState, actions.decrementFocus(), fullState);
          expect(nextState).to.equal(fullStateFocusingOn(0).get('focus'));
        });
      });

      context('when the previous element in the list focused on does not exist', () => {
        it('should not change the state', () => {
          const fullState = fullStateFocusingOn(0);
          const currentState = fullState.get('focus');
          const nextState = focusReducer(currentState, actions.decrementFocus(), fullState);
          expect(nextState).to.equal(currentState);
        });
      });
    });
  });
});
