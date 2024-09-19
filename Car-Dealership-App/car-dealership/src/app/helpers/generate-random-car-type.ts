import { CarType } from '../../types/car-type.enum';

export function generateRandomCarType(): string {
  const types = Object.values(CarType);
  const randomIndex = Math.floor(Math.random() * types.length);
  return types[randomIndex];
}
