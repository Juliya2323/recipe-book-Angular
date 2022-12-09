import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { RecipeService } from "./recipes/recipes.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";

@NgModule({
    // провайдерс мы взяли из app.module
    // сервисы, в отличие от компонетов и директив, экспортировать не нужно!
    // этот модуль собирает только сервисы, объявленные в declared. если мы объявили сервис в injectable --- нельзя
    providers: [
        ShoppingListService,
        RecipeService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
    ]
})
export class CoreModule {}
