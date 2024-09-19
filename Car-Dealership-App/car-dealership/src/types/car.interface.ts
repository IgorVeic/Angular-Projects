import { CarType } from './car-type.enum';
import { FuelType } from './fuel-type.enum';
import { Transmission } from './transmission-type.enum';
import { Color } from './color-type.enum';
import { Brand } from './brand-type.enum';
import { City, Country } from './city-country.enum';

export interface Car {
  id: string;
  description: string;
  price: number;
  images: string[];
  type: CarType;
  year: number;
  color: Color;
  fuelType: FuelType;
  distance: number;
  isNew: boolean;
  location: {
    city: City;
    country: Country;
  };
  brand: Brand;
  model: string;
  enginePower: number;
  doors: number;
  seats: number;
  transmission: Transmission;
}

// export type CreateCar = Omit<
//   Car,
//   | 'id'
//   | 'userId'
//   | 'description'
//   | 'createdAt'
//   | 'color'
//   | 'distance'
//   | 'isNew'
//   | 'location'
//   | 'enginePower'
//   | 'doors'
//   | 'seats'
//   | 'type'
// >;

export type CreateCar = {
  brand: string;
  model: string;
  price: number;
  year: number;
  fuelType: string;
  transmission: string;
  images: string[];
  description?: string;
  type?: string;
  color?: string;
  distance?: number;
  isNew?: boolean;
  enginePower?: number;
  doors?: number;
  seats?: number;
  location?: {
    city: string;
    country: string;
  };
};
