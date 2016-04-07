import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { incrementFocus, decrementFocus } from './focus-actions';

export const Focus = ({ text, incrementFocus, decrementFocus }) => (
  <div className={'focus'}>
    <Link to='/'>Back</Link>
    <button onClick={decrementFocus}>Previous</button>
    <button onClick={incrementFocus}>Next</button>
    <p style={{ fontSize: fontSize(text) }}>{text}</p>
  </div>
);

const fontSize = (text) => {
  const screenArea = document.body.offsetWidth * document.body.offsetHeight;
  const characterArea = screenArea / text.length;
  return Math.sqrt(characterArea) * correctionFactor(text.length);
}

const correctionFactor = (size) => (
  1 + (positiveLog(positiveLog(positiveLog(size))) / 3)
);

const positiveLog = (n) => Math.max(0, Math.log(n));

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
