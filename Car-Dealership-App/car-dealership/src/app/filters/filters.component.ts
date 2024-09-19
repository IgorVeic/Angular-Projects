import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FuelType } from '../../types/fuel-type.enum';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Transmission } from '../../types/transmission-type.enum';
import { Color } from '../../types/color-type.enum';
import { State } from '../../types/state-car.enum';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatRadioModule,
    MatSliderModule,
    MatCheckboxModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    MatIcon,
  ],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FilterComponent {
  fuelTypeOptions = Object.values(FuelType);
  transmissionOptions = Object.values(Transmission);
  stateOptions = Object.values(State);
  carColorOptions = Object.values(Color);

  fuelType = input<FuelType>(FuelType.None);
  onFuelTypeChange = output<FuelType>();

  transmission = input<Transmission>(Transmission.None);
  onTransmissionChange = output<Transmission>();

  carState = input<State>(State.None);
  onCarStateChange = output<State>();

  minimalPrice = input<number>(1000);
  onMinimalPriceChange = output<number>();

  maximalPrice = input<number>(4000000);
  onMaximalPriceChange = output<number>();

  carColor = input<Color>(Color.None);
  onCarColorChange = output<Color>();

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return `${value}`;
  }

  // Define the trackByFn method for ngFor trackBy
  trackByFn(index: number, item: any): number {
    return index;
  }

  // Reset method to reset all filters to their default values
  resetFilters(): void {
    this.onFuelTypeChange.emit(FuelType.None);
    this.onTransmissionChange.emit(Transmission.None);
    this.onCarStateChange.emit(State.None);
    this.onMinimalPriceChange.emit(1000);
    this.onMaximalPriceChange.emit(4000000);
    this.onCarColorChange.emit(Color.None);
  }
}
