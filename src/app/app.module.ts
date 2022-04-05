import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {SettingsPage }from '../pages/settings/settings';
import { WeatherProvider } from '../providers/weather/weather';
import { NewsProvider } from '../providers/news/news';
import { IonicStorageModule } from '@ionic/storage';
import { CityProvider } from '../providers/city/city';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WeatherProvider,
    NewsProvider,
    CityProvider
  ]
})
export class AppModule {}
