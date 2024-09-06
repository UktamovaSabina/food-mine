import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FoodService } from '../../services/food/food.service';
import { Food } from '../../shared/models/Food';
import { StarRatingComponent } from '../partials/star-rating/star-rating.component';
import { SearchComponent } from '../search/search.component';
import { TagsComponent } from '../tags/tags.component';
import { NotFoundComponent } from "../not-found/not-found.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, RouterModule, StarRatingComponent, SearchComponent, TagsComponent, NotFoundComponent]
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];
  constructor(private foodService: FoodService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['searchTerm']) {
        this.foods = this.foodService.getAllFoodsBySearchTerm(params['searchTerm'])
      }
      else if (params['tag']) {
        this.foods = this.foodService.getAllFoodsByTag(params['tag'])
      }
      else {
        this.foods = this.foodService.getAll();
      }
    })
  }
}
