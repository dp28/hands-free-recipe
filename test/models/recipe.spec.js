import { expect } from 'chai';

let Recipe = require(__filename.replace('test', 'src').replace('.spec', '')).default;

describe('Recipe', function() {

  context('with a Recipe with some instructions and ingredients', function () {
    beforeEach(function () {
      this.ingredients = ['1 apple', '1 pig'];
      this.instructions = ['preheat oven', 'put pig in oven for 4 hours'];
      this.recipe = new Recipe(this.ingredients, this.instructions);
    });

    describe('.ingredients', function() {
      it('returns the ingredients passed in to create the Recipe', function() {
        expect(this.recipe.ingredients).to.deep.equal(this.ingredients);
      });
    });

    describe('.instructions', function() {
      it('returns the instructions passed in to create the Recipe', function() {
        expect(this.recipe.instructions).to.deep.equal(this.instructions);
      });
    });

    describe('#currentInstruction', function() {
      it('returns the first instruction', function() {
        expect(this.recipe.currentInstruction()).to.equal(this.instructions[0]);
      });
    });

    describe('#nextInstruction', function() {
      context('when there is an instruction after the current one', function() {
        it('returns the next instruction', function() {
          expect(this.recipe.nextInstruction()).to.equal(this.instructions[1]);
        });

        it('changes the currentInstruction to the nextInstruction', function() {
          this.recipe.nextInstruction();
          expect(this.recipe.currentInstruction()).to.equal(this.instructions[1]);
        });
      })

      context('when there is no instruction after the current one', function() {
        beforeEach(function() {
          this.recipe.instructionIndex = this.instructions.length - 1;
        });

        it('returns the current instruction', function() {
          expect(this.recipe.nextInstruction()).to.equal(this.recipe.currentInstruction());
        });

        it('does not change the currentInstruction', function() {
          let current = this.recipe.currentInstruction();
          this.recipe.nextInstruction();
          expect(this.recipe.currentInstruction()).to.equal(current);
        });
      });
    });

    describe('#previousInstruction', function() {
      context('when there is an instruction before the current one', function() {
        beforeEach(function() {
          this.recipe.instructionIndex = this.instructions.length - 1;
        });

        it('returns the previous instruction', function() {
          expect(this.recipe.previousInstruction()).to.equal(this.instructions[0]);
        });

        it('changes the currentInstruction to the previousInstruction', function() {
          this.recipe.previousInstruction();
          expect(this.recipe.currentInstruction()).to.equal(this.instructions[0]);
        });
      })

      context('when there is no instruction before the current one', function() {
        it('returns the current instruction', function() {
          expect(this.recipe.previousInstruction()).to.equal(this.recipe.currentInstruction());
        });

        it('does not change the currentInstruction', function() {
          let current = this.recipe.currentInstruction();
          this.recipe.previousInstruction();
          expect(this.recipe.currentInstruction()).to.equal(current);
        });
      });
    });
  });
});
