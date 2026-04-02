import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

   constructor(private http: HttpClient) {}


  private apiKey = '23ef1ffbe6ac4994582ed4b05463e2d1';

 
  getCurrentWeather(city: string): Observable<any> {
    return this.http.get<any>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`
    );
  }

    getForecast(city: string): Observable<any> {
    return this.http.get<any>(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric`
    );
  }
}