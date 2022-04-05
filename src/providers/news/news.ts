import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {WeatherAppConstants} from '../../weather.app.constants/weatherappconstants'

/*
  Generated class for the NewsProvider provider.
*/
@Injectable()
export class NewsProvider {

  constructor(public http: HttpClient) {
    console.log('NewsProvider Provider');
  }
// Method to access News API
getNews(country: string): Observable<any>{
  console.log("News URL is: " + WeatherAppConstants.NEWS_BASE_URL + country + "&pageSize=100" + WeatherAppConstants.API_KEY + WeatherAppConstants.NEWS_API_KEY)
  return this.http.get(WeatherAppConstants.NEWS_BASE_URL + country + "&pageSize=100" + WeatherAppConstants.API_KEY + WeatherAppConstants.NEWS_API_KEY)
}

}
