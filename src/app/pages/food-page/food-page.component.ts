import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StarRatingComponent } from '../../components/partials/star-rating/star-rating.component';
import { FoodService } from '../../services/food/food.service';
import { Food } from '../../shared/models/Food';
import { TagsComponent } from "../../components/tags/tags.component";
import { CartService } from '../../services/cart/cart.service';
import { NotFoundComponent } from "../../components/not-found/not-found.component";

@Component({
    selector: 'app-food-page',
    standalone: true,
    templateUrl: './food-page.component.html',
    styleUrl: './food-page.component.css',
    imports: [StarRatingComponent, CommonModule, TagsComponent, NotFoundComponent]
})
export class FoodPageComponent implements OnInit {

  food!: Food;

  constructor(private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if (params['id'])
        this.food = this.foodService.getFoodById(params["id"])
    })
  }

  ngOnInit(): void {
  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }

}
