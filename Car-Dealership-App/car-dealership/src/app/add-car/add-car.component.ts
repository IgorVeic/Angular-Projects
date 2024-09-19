import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CarsService } from '../../services/cars.services';
import { CreateCar } from '../../types/car.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { generateRandomDescription } from '../helpers/generate-random-description';
import { generateRandomCarType } from '../helpers/generate-random-car-type';
import { generateRandomCarColor } from '../helpers/generate-random-car-color';
import { generateRandomDistance } from '../helpers/generate-random-distance';
import { generateRandomIsNew } from '../helpers/generate-random-is-new';
import { generateRandomEnginePower } from '../helpers/generate-random-engine-power';
import { generateRandomDoors } from '../helpers/generate-random-doors';
import { generateRandomSeats } from '../helpers/generate-random-seats';
import { generateRandomLocation } from '../helpers/generate-random-location';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule,
    CommonModule,
    MatIcon,
    MatTooltip,
  ],
  providers: [CarsService],
})
export class AddCarComponent {
  carForm: FormGroup;
  formProgress: number = 0;
  constructor(
    private fb: FormBuilder,
    private carsService: CarsService,
    private snackBar: MatSnackBar
  ) {
    this.carForm = this.fb.group({
      brand: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      model: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      price: ['', [Validators.required, Validators.min(1)]],
      year: ['', [Validators.required, Validators.min(1900)]],
      fuelType: ['', Validators.required],
      transmission: ['', Validators.required],
      images: this.fb.array([this.fb.control('', Validators.required)]), // At least one image URL is required
    });

    // Update progress as the form values change
    this.carForm.valueChanges.subscribe(() => {
      this.updateProgress();
    });
  }

  // Method to calculate the form completion progress
  updateProgress(): void {
    const totalFields = Object.keys(this.carForm.controls).length;
    const validFields = Object.keys(this.carForm.controls).filter(
      (key) => this.carForm.controls[key].valid
    ).length;
    this.formProgress = (validFields / totalFields) * 100;
  }

  // Error handling methods
  get brandErrors(): string {
    const brandControl = this.carForm.get('brand');
    if (brandControl?.touched || brandControl?.dirty) {
      if (brandControl.errors?.['required']) {
        return 'Brand is required';
      }
      if (brandControl.errors?.['minlength']) {
        return 'Brand must have at least 2 characters';
      }
      if (brandControl.errors?.['maxlength']) {
        return 'Brand must be at most 50 characters long';
      }
    }
    return '';
  }

  get modelErrors(): string {
    const modelControl = this.carForm.get('model');
    if (modelControl?.touched || modelControl?.dirty) {
      if (modelControl.errors?.['required']) {
        return 'Model is required';
      }
      if (modelControl.errors?.['minlength']) {
        return 'Model must have at least 2 characters';
      }
      if (modelControl.errors?.['maxlength']) {
        return 'Model must be at most 50 characters long';
      }
    }
    return '';
  }

  get yearErrors(): string {
    const yearControl = this.carForm.get('year');
    if (yearControl?.touched || yearControl?.dirty) {
      if (yearControl.errors?.['required']) {
        return 'Year is required';
      }
      if (yearControl.errors?.['min']) {
        return 'Year must be at least 1900';
      }
    }
    return '';
  }

  get fuelTypeErrors(): string {
    const fuelTypeControl = this.carForm.get('fuelType');
    if (fuelTypeControl?.touched || fuelTypeControl?.dirty) {
      if (fuelTypeControl.errors?.['required']) {
        return 'Fuel Type is required';
      }
    }
    return '';
  }

  get transmissionErrors(): string {
    const transmissionControl = this.carForm.get('transmission');
    if (transmissionControl?.touched || transmissionControl?.dirty) {
      if (transmissionControl.errors?.['required']) {
        return 'Transmission is required';
      }
    }
    return '';
  }

  get priceErrors(): string {
    const priceControl = this.carForm.get('price');
    if (priceControl?.touched || priceControl?.dirty) {
      if (priceControl.errors?.['required']) {
        return 'Price is required';
      }
      if (priceControl.errors?.['min']) {
        return 'Price must be at least 1';
      }
    }
    return '';
  }

  get imagesErrors(): string {
    const imagesControl = this.carForm.get('images') as FormArray;
    if (imagesControl.controls[0].touched || imagesControl.controls[0].dirty) {
      if (imagesControl.controls[0].errors?.['required']) {
        return 'At least one image URL is required';
      }
    }
    return '';
  }

  onSubmit() {
    if (this.carForm.valid) {
      const newCar: CreateCar = {
        brand: this.carForm.value.brand,
        model: this.carForm.value.model,
        price: this.carForm.value.price,
        year: this.carForm.value.year,
        fuelType: this.carForm.value.fuelType,
        transmission: this.carForm.value.transmission,
        images: this.carForm.value.images,
        description: generateRandomDescription(),
        type: generateRandomCarType(),
        color: generateRandomCarColor(),
        distance: generateRandomDistance(),
        isNew: generateRandomIsNew(),
        enginePower: generateRandomEnginePower(),
        doors: generateRandomDoors(),
        seats: generateRandomSeats(),
        location: generateRandomLocation(),
      };

      this.carsService.addCar(newCar).subscribe({
        next: (car) => {
          this.snackBar.open('Car added successfully!', 'Close', {
            duration: 3000,
          });
          this.carForm.reset();
          this.updateProgress(); // Reset progress after form submission
        },
        error: (error) => {
          console.error('Failed to add car:', error.error);
          this.snackBar.open(
            'Failed to add car: ' + error.error.message,
            'Close',
            { duration: 3000 }
          );
        },
      });
    } else {
      this.carForm.markAllAsTouched();
    }
  }
}
