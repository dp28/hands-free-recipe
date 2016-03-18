import { Map } from 'immutable';

const SET_RECIPE = 'SET_RECIPE';

export default function(state = Map(), action) {
  switch (action.type) {
    case SET_RECIPE:
      return state.merge(action.recipe);
    default:
      return state;
  }
}
