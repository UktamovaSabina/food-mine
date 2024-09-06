import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { FoodPageComponent } from './pages/food-page/food-page.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "search/:searchTerm",
        component: HomeComponent
    },
    {
        path: "tag/:tag",
        component: HomeComponent
    },
    {
        path: "food/:id",
        component: FoodPageComponent
    },
    {
        path: "cart-page",
        component: CartPageComponent
    },
];
