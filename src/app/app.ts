import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppService } from './service/app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  cityInput: string = '';
  weatherData: any;
  forecastData: any[] = [];

  isLoading = false;
  errorMsg = '';
  currentDate: string = '';
  currentDay: string = '';

  constructor(private appService: AppService,
              private cdr: ChangeDetectorRef) {} // <-- inject ChangeDetectorRef

  ngOnInit() {
    this.setCurrentDateAndDay();
    this.getWeather('Chennai'); // first load with default city
  }

  setCurrentDateAndDay() {
    const today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.currentDay = days[today.getDay()];
    this.currentDate = today.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  getWeather(city: string) {
    this.isLoading = true;
    this.errorMsg = '';

    // Current weather API call
    this.appService.getCurrentWeather(city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.cdr.detectChanges(); // <-- force template update
      },
      error: () => {
        this.errorMsg = 'City not found';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });

    // Forecast API call
    this.appService.getForecast(city).subscribe({
      next: (data) => {
        this.forecastData = data.list
          .filter((item: any, index: number) => index % 8 === 0)
          .slice(0, 4);
        this.isLoading = false;
        this.cdr.detectChanges(); // <-- force template update
      },
      error: () => {
        this.errorMsg = 'Forecast not available';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  search() {
    if (this.cityInput.trim()) {
      this.getWeather(this.cityInput);
      this.cityInput = '';
    }
  }
}