import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {

  @Input()
  stars!: number;

  @Input()
  size: number = 1;

  getStarImage(current: number): string {
    const previousHalf = current - 0.5;
    const imageName = this.stars >= current ? 'star-full' : this.stars >= previousHalf ? 'star-half' : 'star-empty';
    return `/assets/images/stars/${imageName}.svg`;
  }
}
