import { List, fromJS } from 'immutable';

import { SET_FOCUS } from './focus-actions';

export default function(state = List(), action) {
  switch (action.type) {
    case SET_FOCUS:
      return fromJS(action.focus);
    default:
      return state;
  }
}
