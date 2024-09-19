import { Color } from '../../types/color-type.enum';

export function generateRandomCarColor(): string {
  const colors = Object.values(Color);
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
