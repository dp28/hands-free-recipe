import React from 'react'
import { connect } from 'react-redux';

export const Focus = ({ text }) => (
  <p>{text}</p>
);

const mapStateToProps = (state) => {
  const focusItem = state.getIn(state.get('focus').toJS());
  const text = typeof focusItem === 'string' ? focusItem : null;
  return { text };
}

export default connect(mapStateToProps)(Focus);
