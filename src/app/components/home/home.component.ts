import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { FoodService } from '../../services/food/food.service';
import { Food } from '../../shared/models/Food';
import { StarRatingComponent } from '../partials/star-rating/star-rating.component';
import { SearchComponent } from '../search/search.component';
import { TagsComponent } from '../tags/tags.component';
import { NotFoundComponent } from "../not-found/not-found.component";
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule, RouterModule, StarRatingComponent, SearchComponent, TagsComponent, NotFoundComponent]
})
export class HomeComponent implements OnInit {

  constructor(public foodService: FoodService, public route: ActivatedRoute) { }
  public foods$$!: Observable<Food[]>;

  ngOnInit(): void {
    this.foods$$ = this.route.params.pipe(
      switchMap((params: Params) => {
        if (params['searchTerm']) {
          return this.foodService.getAllFoodsBySearchTerm(params['searchTerm']);
        }
        else if (params['tag']) {
          return this.foodService.getAllFoodsByTag(params['tag'])
        } else {
          return this.foodService.getAll();
        }
      }))
  }
}
