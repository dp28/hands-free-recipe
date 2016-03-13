export function buildRecipe(ingredients, methods) {
  if (canBuildRecipe(ingredients, methods))
    return buildRecipeFromParts(ingredients, methods)
  return null
}

function canBuildRecipe(ingredients, method) {
  return nonEmpty(ingredients) && nonEmpty(method)
}

function nonEmpty(list) {
  return list && list.length
}

function buildRecipeFromParts(ingredients, methods) {
  return {
    ingredients: ingredients,
    methods: methods
  }
}
