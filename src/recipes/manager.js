export default class RecipeManager {

  constructor(recipe) {
    this.recipe = recipe
    this.currentMethodIndex = 0
  }

  currentMethod() {
    return this.recipe.methods[this.currentMethodIndex]
  }

  nextMethod() {
    console.log('next called')
    if (this.currentMethodIndex < this.recipe.methods.length - 1)
      this.currentMethodIndex++
    return this.currentMethod()
  }

  previousMethod() {
    if (this.currentMethodIndex > 0)
      this.currentMethodIndex--
    return this.currentMethod()
  }

}
