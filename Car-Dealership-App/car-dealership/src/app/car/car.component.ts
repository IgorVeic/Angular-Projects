import { Component, Input } from '@angular/core';
import { Car } from '../../types/car.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { NgIf } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatTooltipModule,
    MatSnackBarModule, // Importing MatSnackBarModule for snackbar
    NgIf,
    RouterLink,
  ],
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent {
  @Input() car: Car | undefined;

  constructor(private snackBar: MatSnackBar) {}

  showLocation = false;
  showEnginePower = false;
  showDistance = false;
  showFuelType = false;

  // Toggle methods for car details
  toggleLocation() {
    this.showLocation = !this.showLocation;
  }

  toggleEnginePower() {
    this.showEnginePower = !this.showEnginePower;
  }

  toggleDistance() {
    this.showDistance = !this.showDistance;
  }

  toggleFuelType() {
    this.showFuelType = !this.showFuelType;
  }

  // Method to handle adding the car to the cart with snackbar
  addToCart(car: Car | undefined): void {
    if (car) {
      this.snackBar.open(`${car.brand} ${car.model} added to cart!`, 'Close', {
        duration: 5000,
        verticalPosition: 'bottom', // Can also use 'bottom'
        horizontalPosition: 'center', // Can be 'start', 'center', 'end', 'left', or 'right'
      });
      // Additional logic to add the car to a cart can be implemented here.
    }
  }
}
