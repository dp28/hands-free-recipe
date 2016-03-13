import { expect } from 'chai';

let Recipe = require(__filename.replace('test', 'src').replace('.spec', '')).default;

describe('Recipe', function() {

  describe('.ingredients', function() {
    beforeEach(function () {
      this.ingredients = ['2 onions', '1 pig']
      this.recipe = new Recipe(this.ingredients, [])
    });

    it('returns the ingredients passed in to create the Recipe', function() {
      expect(this.recipe.ingredients).to.deep.equal(this.ingredients);
    })
  });

  describe('.instructions', function() {
    beforeEach(function () {
      this.instructions = ['preheat oven', 'put pig in oven for 4 hours']
      this.recipe = new Recipe([], this.instructions)
    });

    it('returns the instructions passed in to create the Recipe', function() {
      expect(this.recipe.instructions).to.deep.equal(this.instructions);
    })
  });
});
