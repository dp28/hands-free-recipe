import React from 'react'
import { connect } from 'react-redux';

export default ({ focus }) => (
  <p>{focus}</p>
);

const mapStateToProps = (state) => { focus: state.instructions.first() }
