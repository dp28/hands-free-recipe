import React from 'react';
import { connect } from 'react-redux';

import FocusButton from '../focus-button/focus-button-component';

const instructionsLocation = ['recipe', 'instructions']

export const InstructionList = ({ instructions }) => (
  <ol>
  {
    instructions.map((instruction, index) =>
      <li key={index}>
        <FocusButton focusOn={[...instructionsLocation, index]} />
        {instruction}
      </li>
    )
  }
  </ol>
);

const mapStateToProps = (state) => ({ instructions: state.getIn(instructionsLocation) })

export default connect(mapStateToProps)(InstructionList);
