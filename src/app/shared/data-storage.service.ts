import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipes.model';
import { map, take, tap, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth-service';

@Injectable({providedIn: 'root'})

export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://course-project-377b9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  fetchRecipes() {
    // for this fetch-method we need to combine both user-objest sub and http sub into 1 subscription
    //take operator: take 1 value from our observable and then unsubscribe
    //delete subscribe, move setRecipes to TAP operator and subscribe in header-component in fetch method

    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get<Recipe[]>
        (
          'https://course-project-377b9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
          {
            params: new HttpParams().set('ayth', user.token)
          }
        );
    }),
      map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }


}
