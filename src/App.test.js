//src App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const setup = () => {
  const app = render(<App />);

  userEvent.click(app.getByText('Add Recipe'));

  // Add the submit button to your setup method:
  const submitButton = app.getByRole('button')
  const instructionsInput = app.getByLabelText('Instructions:')
  const nameInput = app.getByLabelText('Recipe name:')

  return {
    instructionsInput,
    nameInput,
    submitButton
  }
}

test('typing in the recipe name makes the recipe name appear in the input', async () => {
  render(<App />);

  const recipeName = 'No pockets';
  userEvent.click(screen.getByText("Add Recipe"));
  await userEvent.type(screen.getByLabelText('Recipe name:'), recipeName);

  expect(screen.getByLabelText('Recipe name:').value).toEqual(recipeName);
})

test('typing in the recipe instructions makes the instructions appear in the form', async () => {
  const {instructionsInput} = setup();

  const recipeInstructions = "kinda hard to write instructions without knowing what I'm cooking"

  await userEvent.type(instructionsInput, recipeInstructions)
  expect(instructionsInput.value).toEqual(recipeInstructions);
})

test('recipe name from state appears in an unordered list', async () => {
  const {instructionsInput, nameInput, submitButton} = setup();
  const recipeName = "Lean Pockets"
  const recipeInstructions = "place in toaster oven on 350 for 45 minutes"

  await userEvent.type(instructionsInput, recipeInstructions)
  await userEvent.type(nameInput, recipeName)
  userEvent.click(submitButton);

  expect(screen.getByRole('list')).toBeInTheDocument();
  expect(screen.getByText(recipeName)).toBeInTheDocument();
})

test('all recipies should show up when adding a recipe', async() => {
  const {instructionsInput, nameInput, submitButton} = setup();

  const recipe1 = "recipe one"
  const recipeInstructions = "recipe one instructions"

  const recipe2 = "recipe two"
  const recipeInst2 = "recipe two instructions"

  await userEvent.type(instructionsInput, recipeInstructions)
  await userEvent.type(nameInput, recipe1)
  userEvent.click(submitButton)

  await userEvent.type(instructionsInput, recipeInst2)
  await userEvent.type(nameInput, recipe2)
  userEvent.click(submitButton)

  expect(screen.getByRole('list')).toBeInTheDocument();
  expect(screen.getByText(recipe1)).toBeInTheDocument();
  expect(screen.getByText(recipe1)).toBeInTheDocument();

})