import React from 'react'

const recipe = {
  title: 'Hog roast',
  ingredients: ['1 apple', '1 pig'],
  instructions: ['Put apple in pig\'s mouth', 'Roast pig']
}

const focus = recipe.instructions[0]

export default class App extends React.Component {
  render() {
    return React.cloneElement(this.props.children, { recipe, focus })
  }
}
