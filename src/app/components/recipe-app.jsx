import React from 'react'
import IngredientList from './ingredient-list'
import InstructionList from './instruction-list'

export default ({ recipe }) => (
  <div>
    <h1>{recipe.title}</h1>
    <IngredientList ingredients={recipe.ingredients} />
    <InstructionList instructions={recipe.instructions} />
  </div>
);
