import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {WeatherAppConstants} from '../../weather.app.constants/weatherappconstants'

@Injectable()
export class WeatherProvider {

  constructor(public http: HttpClient) {
    console.log('WeatherProvider Provider');
  }
  getWeather(city: string, lat: string, lon: string, units: string):Observable<any> {
  return this.http.get(WeatherAppConstants.WEATHER_BASE_URL + WeatherAppConstants.WEATHER_LATTITUDE + lat + WeatherAppConstants.WEATHER_LONGITUDE + lon + WeatherAppConstants.KEY + WeatherAppConstants.WEATHER_API_KEY + WeatherAppConstants.WEATHER_IN_MINUTES + WeatherAppConstants.WEATHER_UNITS + units);
}
}
