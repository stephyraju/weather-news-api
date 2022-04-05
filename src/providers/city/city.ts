import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {WeatherAppConstants} from '../../weather.app.constants/weatherappconstants'
/*
  Generated class for the CityProvider provider.
*/
@Injectable()
export class CityProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CityProvider Provider');
  }

  getCityData(cityName: string): Observable<any> {
    return this.http.get(WeatherAppConstants.COUNTRIES_BASE_URL + cityName);
  }
}
