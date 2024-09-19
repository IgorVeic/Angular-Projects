import { Color } from './color-type.enum';
import { Transmission } from './transmission-type.enum';

export interface SearchCarQuery {
  page?: number;
  pageSize?: number;
  type?: string;
  brand?: string;
  model?: string;
  minYear?: number;
  color?: Color;
  fuelType?: string;
  maxDistance?: number;
  isNew?: boolean;
  //   city?: City;
  //   country?: Country;
  minimalPrice?: number;
  maximalPrice?: number;
  minEnginePower?: number;
  transmission?: Transmission;
  searchTerm?: string;
}
