import { List, fromJS } from 'immutable';

const SET_FOCUS = 'SET_FOCUS';

export default function(state = List(), action) {
  switch (action.type) {
    case SET_FOCUS:
      return fromJS(action.focus);
    default:
      return state;
  }
}
