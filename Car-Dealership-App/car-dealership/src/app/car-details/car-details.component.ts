import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CarsService } from '../../services/cars.services';
import { Car } from '../../types/car.interface';
import { catchError, of, switchMap, Subscription, Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule,
    AsyncPipe,
    JsonPipe,
    MatProgressSpinnerModule,
  ],
  providers: [CarsService],
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  // car: Car | null = null;
  car$: Observable<Car | null> = new Observable<Car | null>();
  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carsService: CarsService
  ) {}

  ngOnInit(): void {
    this.car$ = this.route.params.pipe(
      switchMap((params) => this.carsService.getCarById(params['id'])),
      catchError((error) => {
        console.error('Error fetching car:', error);
        return of(null);
      })
    );
  }

  // Method to navigate back to the home page
  goHome(): void {
    this.router.navigate(['/']);
  }
}

// const carId = this.route.snapshot.paramMap.get('id');
// console.log('Car ID:', carId);
// if (carId) {
//   this.carsService.getCarById(carId).subscribe((data) => {
//     console.log('Fetched Car:', data);
//     this.car = data;
//   });
// }
