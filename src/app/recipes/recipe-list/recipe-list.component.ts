import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('A pie', 'This is my pie', 'https://i.pinimg.com/originals/93/5b/e0/935be0854f8f419df9770fe8ee7c2b40.jpg'),
    new Recipe('Meat', 'This is my shashlik', 'https://i.pinimg.com/originals/3e/88/d6/3e88d6849458773c5a6d71b7f89e5b66.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
