import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { incrementFocus, decrementFocus } from './focus-actions'

export const Focus = ({ text, incrementFocus, decrementFocus }) => (
  <div>
    <Link to='/'>Back</Link>
    <button onClick={decrementFocus}>Previous</button>
    <button onClick={incrementFocus}>Next</button>
    <p>{text}</p>
  </div>
);

const mapStateToProps = (state) => {
  const focusPath = state.get('focus');
  if (!focusPath)
    return { text: null };
  const focusItem = state.getIn(focusPath.toJS());
  const text = typeof focusItem === 'string' ? focusItem : null;
  return { text };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ incrementFocus, decrementFocus }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Focus);
