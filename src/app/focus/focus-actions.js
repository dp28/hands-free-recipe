export const SET_FOCUS = 'SET_FOCUS';
export const INCREMENT_FOCUS = 'INCREMENT_FOCUS';
export const DECREMENT_FOCUS = 'DECREMENT_FOCUS';

export const setFocus = keyPath => ({ type: SET_FOCUS, focus: keyPath });
export const incrementFocus = () => ({ type: INCREMENT_FOCUS });
export const decrementFocus = () => ({ type: DECREMENT_FOCUS });
