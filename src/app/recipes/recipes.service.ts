import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipes.model";

@Injectable()

export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'A pie',
      'This is my pie',
      'https://i.pinimg.com/originals/93/5b/e0/935be0854f8f419df9770fe8ee7c2b40.jpg',
      [
        new Ingredient('flour', 1),
        new Ingredient('eggs', 3)
      ]),
    new Recipe(
      'Meat',
      'This is my shashlik',
      'https://i.pinimg.com/originals/3e/88/d6/3e88d6849458773c5a6d71b7f89e5b66.jpg',
      [
        new Ingredient('meat', 5),
        new Ingredient('ketchup', 2)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

}
