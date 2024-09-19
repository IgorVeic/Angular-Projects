import { SearchCarQuery } from '../types/seach-car-query.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Car, CreateCar } from '../types/car.interface';
import { Response } from '../types/response.interface';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private readonly allCarsPath = 'http://localhost:3000/api/cars';

  constructor(private readonly http: HttpClient) {}

  // Method to get all cars with optional search query parameters
  getAllCars(searchQuery: SearchCarQuery = {}): Observable<Response<Car[]>> {
    return this.http.get<Response<Car[]>>(this.allCarsPath, {
      params: {
        ...searchQuery,
      },
    });
  }

  // Method to get a car by its ID
  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.allCarsPath}/${id}`);
  }

  // Method to add a new car
  addCar(car: CreateCar): Observable<Car> {
    return this.http.post<Car>(this.allCarsPath, car);
  }
}
