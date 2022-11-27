import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipes.model';
import { map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://course-project-377b9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://course-project-377b9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
    .pipe(map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
      });
    }),
    tap(recipes => {
      this.recipeService.setRecipes(recipes);
    }))
    /* .subscribe(
      recipes => {
        this.recipeService.setRecipes(recipes);
      }
    ); */

    //delete subscribe, move setRecipes to TAP operator and subscribe in header-component in fetch method
  }


}
