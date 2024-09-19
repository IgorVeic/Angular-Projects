import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import reviewsData from '../../data/reviews.json';

interface Review {
  id: number;
  name: string;
  review: string;
  rating: number;
  date: string;
}

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];

  constructor() {}

  ngOnInit(): void {
    this.reviews = this.shuffleArray(
      reviewsData.map((review) => ({
        ...review,
        date: review.date || new Date().toISOString(),
      }))
    );
  }

  // Function to shuffle the array
  shuffleArray(array: Review[]): Review[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
