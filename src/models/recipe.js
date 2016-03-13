export default class Recipe {

  constructor(ingredients, instructions) {
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.instructionIndex = 0;
  }

  currentInstruction() {
    return this.instructions[this.instructionIndex];
  }

  nextInstruction() {
    if (this.instructionIndex < this.instructions.length - 1)
      this.instructionIndex++;
    return this.currentInstruction();
  }

  previousInstruction() {
    if (this.instructionIndex > 0)
      this.instructionIndex--;
    return this.currentInstruction();
  }
}
