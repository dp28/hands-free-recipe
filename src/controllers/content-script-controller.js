import extractRecipe from '../lib/extract-recipe';

class ContentScriptController {

  start() {
    console.debug('starting');
    this.recipe = extractRecipe(document.body);
    console.debug('found', this.recipe);
  }
}

let controller = new ContentScriptController();
controller.start();
