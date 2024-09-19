import { Car } from '../../types/car.interface';

export function exportComparisonAsCSV(
  car1: Car | null,
  car2: Car | null
): void {
  if (!car1 || !car2) {
    console.error('Both cars need to be loaded to export as CSV.');
    return;
  }

  const headers = [
    'Brand',
    'Model',
    'Year',
    'Price (USD)',
    'Engine Power (HP)',
    'Fuel Type',
    'Distance (km)',
    'Location (City, Country)',
    'Color',
    'Transmission',
    'Seats',
    'Doors',
    'Type',
  ];

  const rows = [
    [
      car1.brand,
      car1.model,
      car1.year.toString(),
      car1.price.toFixed(2),
      car1.enginePower.toString(),
      car1.fuelType,
      car1.distance.toString(),
      `${car1.location.city}, ${car1.location.country}`,
      car1.color,
      car1.transmission,
      car1.seats.toString(),
      car1.doors.toString(),
      car1.type,
    ],
    [
      car2.brand,
      car2.model,
      car2.year.toString(),
      car2.price.toFixed(2),
      car2.enginePower.toString(),
      car2.fuelType,
      car2.distance.toString(),
      `${car2.location.city}, ${car2.location.country}`,
      car2.color,
      car2.transmission,
      car2.seats.toString(),
      car2.doors.toString(),
      car2.type,
    ],
  ];

  let csvContent = headers.join(',') + '\n';
  csvContent += rows
    .map((row) => row.map((value) => `"${value}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'car-comparison.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
