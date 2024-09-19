import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { AddCarComponent } from './add-car/add-car.component';
import { CompareCarsComponent } from './compare-cars/compare-cars.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Home route
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cars/add-car-for-sale', component: AddCarComponent },
  { path: 'cars/:id', component: CarDetailsComponent },
  { path: 'compare-cars', component: CompareCarsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
