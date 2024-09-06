import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FoodService } from '../../services/food/food.service';
import { Tag } from '../../shared/models/Tag';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit {
  @Input() foodPageTags?: string[];
  @Input() tags?: Tag[];
  @Input() justifyContent: string = 'center';

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    if (!this.foodPageTags)
      this.tags = this.foodService.getAllTags()
  }

}
