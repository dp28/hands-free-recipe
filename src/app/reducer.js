import { Map } from 'immutable';
import recipe from './recipes/recipe-reducer';
import focus from './focus/focus-reducer';

const initialState = Map({ focus: [] });

export default (state = initialState, action) => {
  console.log('reduce', state.toJS());
  return initialState.merge(Map({
    recipe: recipe(state.get('recipe'), action),
    focus: focus(state.get('focus'), action, state)
  }));
};
