import { Component, Input, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { Car } from '../../types/car.interface';
import { CarComponent } from '../car/car.component';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule, MatGridListModule, CarComponent],
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  @Input() cars: Car[] = [];
  cols: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.calculateColumns();
  }

  calculateColumns(innerWidth: number = window.innerWidth) {
    if (innerWidth <= 400) {
      this.cols = 1;
    } else if (innerWidth <= 768) {
      this.cols = 2;
    } else if (innerWidth <= 1024) {
      this.cols = 3;
    } else if (innerWidth <= 1200) {
      this.cols = 4;
    } else {
      this.cols = 5;
    }
  }

  onResize(event: any) {
    this.calculateColumns(event.target.innerWidth);
  }

  trackByCarId(index: number, car: Car): string {
    return car.id;
  }
}
