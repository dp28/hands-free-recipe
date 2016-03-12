export default class RecipeManager {

  constructor(recipe) {
    this.recipe = recipe
    this.currentMethodIndex = 0
  }

  get currentMethod() {
    return this.recipe.methods[this.currentMethodIndex]
  }

  nextMethod() {
    this.currentMethodIndex++
    return this.currentMethod
  }

}
