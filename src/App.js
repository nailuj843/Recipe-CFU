// App.js
import React from 'react';

class App extends React.Component {
  state = {
    isAddRecipeFormDisplayed: false,
    recipes: [],
    newRecipeName: '',
    newRecipeInstructions: ''
    //this.submitRecipe = this.submitRecipe.bind(this)
  }

  toggleAddRecipeForm = () => {
    this.setState({isAddRecipeFormDisplayed: !this.state.isAddRecipeFormDisplayed})
  }

  handleChange = (event) => {
    const target = event.target
    const name = target.name

    this.setState({[name]: target.value})
  }

  handleRecipeInstructionsChange(event){
    const value = event.target.value;

    this.setState({newRecipeInstructions: value})
  }

  handleRecipeNameChange = (event) => {
    const value = event.target.value;

    this.setState({newRecipeName: value})
  }
  
  submitRecipe(event){
    event.preventDefault()
    console.log('trying to push the alue to the array')
    const newItem = {name: this.state.newRecipeName, instructions: this.state.newRecipeInstructions}
    console.log(newItem)
    const list = this.state.recipes
    list.push(newItem)
    console.log(list)
    this.setState( [...this.state.recipes, {name: this.state.newRecipeName, instructions: this.state.newRecipeInstructions}])
  }

  formatList(){
    return (
      this.state.recipes.map( recipe => <li key={recipe.name}> {recipe.name} </li>)
    )
  }

  render(){
  const addNewRecipeForm = (
      <form id="recipe-form" onSubmit={this.submitRecipe.bind(this)}>
        <label htmlFor="newRecipeName">Recipe name: </label>
        <input type="text"
              name="newRecipeName" 
              id="newRecipeName" 
              onChange={this.handleChange.bind(this)} 
              value={this.state.newRecipeName}/>

        <label htmlFor="newRecipeInstructions">Instructions:</label>
        
        <textarea id="newRecipeInstructions" 
              id="newRecipeInstructions"
              name="newRecipeInstructions"

              placeholder="write recipe instructions here..." 
              onChange={this.handleChange.bind(this)}
              value={this.state.newRecipeInstructions} />

        <input type="submit" />
      </form>
    )

    return (
      <div className="App">
        <h1 className="App-header">My Recipes</h1>
        {
          this.state.isAddRecipeFormDisplayed
          ? addNewRecipeForm
          : <button id="add-recipe" onClick={this.toggleAddRecipeForm}>Add Recipe</button>
        }
        {
          this.state.recipes.length > 0 ?
          <ul>
            {this.formatList()}
          </ul> :
          <p>There are no recipes to list.</p>
        }
      </div>
    )
  }
}

export default App;