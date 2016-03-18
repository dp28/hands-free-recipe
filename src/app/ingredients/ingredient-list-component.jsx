import React from 'react'

export default ({ ingredients }) => (
  <ul>
  {
    ingredients.map((ingredient) =>
      <li key={ingredient}> {ingredient} </li>
    )
  }
  </ul>
);
