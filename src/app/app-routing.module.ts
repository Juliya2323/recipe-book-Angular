import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRroutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRroutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
