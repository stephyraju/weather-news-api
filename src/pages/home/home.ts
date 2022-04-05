import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { WeatherProvider } from '../../providers/weather/weather';
import { NewsProvider } from '../../providers/news/news';
import { CityProvider } from '../../providers/city/city';
import { Storage } from '@ionic/storage';
import { WeatherAppConstants } from '../../weather.app.constants/weatherappconstants'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //General Variables
  private location: string;
  private unit: string;
  private flag: URL;
  
  private weatherInfo = {
    city: '',
    temp: '',
    description: '',
    icon: '',
    windFrom: '',
    imageSrc: ''
  }

  private newsArray: any = [];
  private title: string;
  private news: string;
  private newsImage: URL;
  private newsUrl: URL;
  

  private capital: string;
  private latLng: string[];
  private units: string;
  private cityName: string;
  private countryName: string;
  private countryAlpha2Code: string;
  private showNews: boolean = false;
  private showContent: boolean = false;
  private showNoContent: boolean = true;
  private showNoCityFound: boolean = false;
  private newsLabel: string;
  private noNews: string = "";


  // Construction decalring various Objects
  constructor(public navCtrl: NavController, private wp: WeatherProvider, private np: NewsProvider, private cp: CityProvider, private storage: Storage) {
  }

  // Toggle to control the the display of main content based on Settings
  toggleShowContent() {
    this.showContent = !this.showContent;
  }

  // Toggle to control the the display of content based on Settings
  toggleNoShowContent() {
    this.showNoContent = !this.showNoContent;
  }

  // Toggle to control the label of News button
  toggleNewsButton() {
    this.showNews = !this.showNews;
    if (this.showNews) {
      this.newsLabel = "Hide";
    } else {
      this.newsLabel = "Show";
    }
  }

  // Method to open settings Page
  goSettingsPage() {
    this.navCtrl.push(SettingsPage);
  }

  ionViewDidLoad() {
    this.newsLabel = "Show";

    // Subscriber to get City information from settings
    this.storage.get(WeatherAppConstants.CITY).then((val) => {
      if (val == undefined) {
        this.showNoContent = true;
      } else {
        this.showContent = false;
        this.toggleShowContent();
        this.cityName = val;

        // Subscriber to get City Data
        this.cp.getCityData(val).subscribe(data => {

          if (data[0] == undefined) {
            this.showNoCityFound = true;
            this.showContent = false;
            this.showNoContent = false;
          } else {
            this.showNoContent = false;
            this.capital = data[0].name;
            this.flag = data[0].flag;
            this.countryAlpha2Code = data[0].alpha2Code;
            this.latLng = data[0].latlng;
            this.countryName = data[0].name;

            // Subscriber to get Units information from settings
            this.storage.get(WeatherAppConstants.UNITS).then((val) => {
              if(val){
                this.units = val;
              }else{
                this.units = "M";
              }              
                this.wp.getWeather(this.location, this.latLng[0], this.latLng[1], this.units).subscribe(weatherData => {
                this.weatherInfo.city = weatherData.data[0].city_name;
                this.weatherInfo.temp = weatherData.data[0].temp;
                this.weatherInfo.icon = weatherData.data[0].weather.icon;
                this.weatherInfo.imageSrc = WeatherAppConstants.WEATHER_ICON_URL + this.weatherInfo.icon + WeatherAppConstants.WEATHER_ICON_TYPE;
                this.weatherInfo.description = weatherData.data[0].weather.description;
                this.weatherInfo.windFrom = weatherData.data[0].wind_cdir_full;

                // Subscriber to get Country Code data
                this.np.getNews(this.countryAlpha2Code).subscribe(data => {

                  if (data.articles && data.articles.length) {
                    this.newsArray = data.articles;
                  } else {
                    this.showNews = false;
                    this.noNews = "No available "
                  }
                })
              });

            });
          }
        })
      }
    });
  }
}
