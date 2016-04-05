import React from 'react'
import { Link } from 'react-router';

export default ({ ingredients }) => (
  <ul>
  {
    ingredients.map((ingredient) =>
      <li key={ingredient}>
        <Link to='focus'> Focus </Link>
        {ingredient}
      </li>
    )
  }
  </ul>
);
