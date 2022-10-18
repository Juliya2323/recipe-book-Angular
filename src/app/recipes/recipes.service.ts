import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipes.model";

export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A pie', 'This is my pie', 'https://i.pinimg.com/originals/93/5b/e0/935be0854f8f419df9770fe8ee7c2b40.jpg'),
    new Recipe('Meat', 'This is my shashlik', 'https://i.pinimg.com/originals/3e/88/d6/3e88d6849458773c5a6d71b7f89e5b66.jpg')
  ];

  getRecipes() {
    return this.recipes.slice();
  }

}
