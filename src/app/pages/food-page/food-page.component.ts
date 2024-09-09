import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StarRatingComponent } from '../../components/partials/star-rating/star-rating.component';
import { FoodService } from '../../services/food/food.service';
import { Food } from '../../shared/models/Food';
import { TagsComponent } from "../../components/tags/tags.component";
import { CartService } from '../../services/cart/cart.service';
import { NotFoundComponent } from "../../components/not-found/not-found.component";
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-food-page',
  standalone: true,
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css',
  imports: [StarRatingComponent, CommonModule, TagsComponent, NotFoundComponent]
})
export class FoodPageComponent implements OnInit {

  food$$!: Observable<Food | undefined>;

  constructor(private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private router: Router) {
    this.food$$ = activatedRoute.params.pipe(
      switchMap((params: Params) => {
        if (params['id']) {
          return this.foodService.getFoodById(+params['id']);
        } else {
          return new Observable<Food | undefined>((observer) => observer.next(undefined));
        }
      })
    );
  }

  ngOnInit(): void {
  }

  addToCart(food: Food) {
    this.cartService.addToCart(food);
    this.router.navigateByUrl('/cart-page');
  }

}
