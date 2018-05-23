import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { ApiService } from '../services/apiservice';
import { GotApp } from './app.component';

@NgModule({
    declarations: [GotApp, AboutPage, ContactPage, HomePage, TabsPage],
    imports: [BrowserModule, HttpModule, IonicModule.forRoot(GotApp)],
    bootstrap: [IonicApp],
    entryComponents: [GotApp, AboutPage, ContactPage, HomePage, TabsPage],
    providers: [
        StatusBar,
        SplashScreen,
        ApiService,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule {}