import React from 'react'

export default ({ instructions }) => (
  <ol>
  {
    instructions.map((instruction, index) =>
      <li key={index}>{instruction}</li>
    )
  }
  </ol>
);
