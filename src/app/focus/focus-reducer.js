import { fromJS } from 'immutable';

import { SET_FOCUS, INCREMENT_FOCUS, DECREMENT_FOCUS } from './focus-actions';

export default reducer({
  [SET_FOCUS]: (_, action) => fromJS(action.focus),
  [INCREMENT_FOCUS]: (focus, _, fullState) => addToFocusIfPossible(focus, 1, fullState),
  [DECREMENT_FOCUS]: (focus, _, fullState) => addToFocusIfPossible(focus, -1, fullState)
});

function reducer(actionTypeMap) {
  return (state, action, fullState) => {
    const handler = actionTypeMap[action.type];
    return handler ? handler.call(null, state, action, fullState) : state;
  };
}

function addToFocusIfPossible(focus, toAdd, fullState) {
  if (!focus || typeof focus.last() !== 'number')
    return focus;
  const focusList = fullState.getIn(focus.pop().toJS());
  const nextFocus = addToLast(focus, toAdd);
  return canChangeFocusTo(nextFocus, focusList) ? nextFocus : focus;
}

function addToLast(list, toAdd) {
  return list.set(-1, list.last() + toAdd);
}

function canChangeFocusTo(nextFocus, focusList) {
  const nextFocusOn = nextFocus.last();
  return nextFocusOn >= 0 && nextFocusOn < focusList.size;
}
