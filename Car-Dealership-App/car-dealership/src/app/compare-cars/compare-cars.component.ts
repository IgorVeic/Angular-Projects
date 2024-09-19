import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarsService } from '../../services/cars.services';
import { Car } from '../../types/car.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { exportComparisonAsCSV } from '../helpers/csv-export';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-compare-cars',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatSnackBarModule,
    MatProgressSpinner,
    MatTooltip,
  ],
  templateUrl: './compare-cars.component.html',
  styleUrls: ['./compare-cars.component.css'],
})
export class CompareCarsComponent {
  car1: Car | null = null;
  car2: Car | null = null;
  carId1 = '';
  carId2 = '';
  loading = false;
  comparisonSuccessful = false;

  constructor(
    private carsService: CarsService,
    private snackBar: MatSnackBar
  ) {}

  compareCars() {
    if (this.carId1 && this.carId2) {
      this.loading = true;
      this.comparisonSuccessful = false;

      this.carsService.getCarById(this.carId1).subscribe(
        (car: Car) => {
          this.car1 = car;
          this.carsService.getCarById(this.carId2).subscribe(
            (car: Car) => {
              this.car2 = car;
              this.loading = false;
              this.comparisonSuccessful = true;
              this.showSuccessSnackBar('Both cars loaded successfully!');
            },
            (error: HttpErrorResponse) => {
              this.loading = false;
              this.car2 = null;
              this.handleHttpError(error, 'Car 2');
            }
          );
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.car1 = null;
          this.handleHttpError(error, 'Car 1');
        }
      );
    } else {
      this.showErrorSnackBar('Please enter both car IDs to compare.');
    }
  }

  private handleHttpError(error: HttpErrorResponse, carLabel: string) {
    if (error.status === 404) {
      this.showErrorSnackBar(
        `Unable to process your request at this time. Please try again later.`
      );
    } else {
      this.showErrorSnackBar(`${carLabel} not found. Please check the ID.`);
    }
  }

  private showErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-error'],
    });
  }

  private showSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success'],
    });
  }

  resetComparison() {
    this.car1 = null;
    this.car2 = null;
    this.carId1 = '';
    this.carId2 = '';
    this.comparisonSuccessful = false;
  }

  exportAsCSV() {
    exportComparisonAsCSV(this.car1, this.car2);
    this.showSuccessSnackBar('Comparison exported as CSV successfully!');
  }
}
