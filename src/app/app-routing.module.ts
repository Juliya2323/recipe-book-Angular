import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRroutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(module => module.RecipesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(appRroutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
