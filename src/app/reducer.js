import { fromJS } from 'immutable';

const SET_RECIPE = 'SET_RECIPE';

const initialState = fromJS({ focus: [], recipe: {} });

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_RECIPE:
      return state.mergeIn(['recipe'], action.recipe);
    default:
      return state;
  }
}
