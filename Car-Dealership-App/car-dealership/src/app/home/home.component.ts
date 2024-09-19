import { HttpClientModule } from '@angular/common/http';
import { CarsService } from '../../services/cars.services';
import { Component, effect, OnInit, signal } from '@angular/core';
import { CarsComponent } from '../cars/cars.component';
import { Car } from '../../types/car.interface';
import { finalize, map, Observable, Subscription, tap } from 'rxjs';
import { SearchComponent } from '../search/search.component';
import { FilterComponent } from '../filters/filters.component';
import { FuelType } from '../../types/fuel-type.enum';
import { Transmission } from '../../types/transmission-type.enum';
import { Color } from '../../types/color-type.enum';
import { Response } from '../../types/response.interface';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { SearchCarQuery } from '../../types/seach-car-query.interface';
import { State } from '../../types/state-car.enum';
import { WhyChooseUsComponent } from '../why-choose-us/why-choose-us.component';
import { LoaderComponent } from '../loader/loader.component';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';
import { ReviewsComponent } from '../reviews/reviews.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarsComponent,
    SearchComponent,
    FilterComponent,
    CommonModule,
    AsyncPipe,
    JsonPipe,
    HttpClientModule,
    MatPaginator,
    WhyChooseUsComponent,
    LoaderComponent,
    ScrollToTopComponent,
    ReviewsComponent,
  ],
  providers: [CarsService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  subscription: Subscription = new Subscription();
  cars$: Observable<Car[]> = new Observable<Car[]>();
  searchTerm = signal<string>('');
  fuelType = signal<FuelType>(FuelType.None);
  transmission = signal<Transmission>(Transmission.None);
  carState = signal<State>(State.None);
  minimalPrice = signal<number>(1000);
  maximalPrice = signal<number>(4000000);
  carColor = signal<Color>(Color.None);
  total = signal<number>(0);
  pageSize = signal<number>(10);
  page = signal<number>(0);
  isLoading = signal<boolean>(false);

  constructor(private carsService: CarsService) {
    effect(
      () => {
        const searchQueryParams: SearchCarQuery = {
          page: this.page(),
          pageSize: this.pageSize(),
          searchTerm: this.searchTerm().length ? this.searchTerm() : '',
          minimalPrice: this.minimalPrice(),
          maximalPrice: this.maximalPrice(),
        };

        if (this.transmission() !== Transmission.None) {
          searchQueryParams.transmission = this.transmission();
        }

        if (this.fuelType() !== FuelType.None) {
          searchQueryParams.fuelType = this.fuelType();
        }

        if (this.carColor() !== Color.None) {
          searchQueryParams.color = this.carColor();
        }

        if (this.carState() !== State.None) {
          searchQueryParams.isNew = this.carState() === State.New;
        }

        this.getAllCars(searchQueryParams);
      },
      {
        allowSignalWrites: true,
      }
    );
  }

  // filteredCars = computed<Car[]>(() => {
  //   let filteredCars: Car[] = this.cars();

  //   if (this.fuelType() !== FuelType.None) {
  //     filteredCars = filteredCars.filter(
  //       (car) => car.fuelType === this.fuelType()
  //     );
  //   }

  //   if (this.transmission() !== Transmission.None) {
  //     filteredCars = filteredCars.filter(
  //       (car) => car.transmission === this.transmission()
  //     );
  //   }

  //   if (this.carState() !== State.None) {
  //     filteredCars = filteredCars.filter(
  //       (car) => car.isNew === (this.carState() === State.New)
  //     );
  //   }

  //   if (this.minimalPrice() > 1000) {
  //     filteredCars = filteredCars.filter(
  //       (car) => car.price >= this.minimalPrice()
  //     );
  //   }

  //   if (this.maximalPrice() < 4000000) {
  //     filteredCars = filteredCars.filter(
  //       (car) => car.price <= this.maximalPrice()
  //     );
  //   }

  //   if (this.carColor() !== Color.None) {
  //     filteredCars = filteredCars.filter(
  //       (car) => car.color === this.carColor()
  //     );
  //   }

  //   return filteredCars;
  // });

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars(searchParams?: SearchCarQuery) {
    this.isLoading.set(true);

    this.cars$ = this.carsService.getAllCars(searchParams).pipe(
      tap((response: Response<Car[]>) => this.total.set(response.total)),
      map((response: Response<Car[]>) => response.payload),
      finalize(() => this.isLoading.set(false))
    );
  }

  handleUpdateSearchTerm(updatedSearchTerm: string) {
    this.searchTerm.update(() => updatedSearchTerm);
  }
  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }
}
