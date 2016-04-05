import React from 'react'
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { setFocus } from '../focus/focus-actions';

export const FocusButton = ({ setFocus, focusOn }) => (
  <Link to='focus' onClick={setFocus(focusOn)}> Focus </Link>
);

const mapDispatchToProps = (dispatch) => {
  return { setFocus: (list) => () => dispatch(setFocus(list)) }
};

export default connect(null, mapDispatchToProps)(FocusButton);
