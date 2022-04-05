import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CityProvider } from '../../providers/city/city';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { WeatherAppConstants } from '../../weather.app.constants/weatherappconstants'


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  cityName: string;
  units: string;
  buttonDisabled: boolean = true;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage, private cityProvider: CityProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  saveSettings() {
// Alert when city is not selected
    if (this.cityName == undefined) {
      window.alert("Enter City Name");
    } else {
      console.log("City Name: " + this.cityName)
      if (this.units == undefined) {
        window.alert("Select a Unit");
      } else {
        console.log("Unit Selected is: " + this.units)
        this.storage.set(WeatherAppConstants.CITY, this.cityName);
        this.storage.set(WeatherAppConstants.UNITS, this.units);
        this.cityProvider.getCityData(this.cityName);
        this.navCtrl.push(HomePage);
      }
    }

  }
}
