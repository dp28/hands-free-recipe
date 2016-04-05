import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';

export const Focus = ({ text }) => (
  <div>
    <Link to='/'>Back</Link>
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

export default connect(mapStateToProps)(Focus);
