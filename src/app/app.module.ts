import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { appRouting } from './app-routing';
import { UserListComponent } from './user-list/user-list.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { CheckInModalComponent } from './modals/check-in-modal/check-in-modal.component';

import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    UserListComponent,
    GoogleMapComponent,
    CheckInModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    appRouting,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCXQuy-ESvHy_6Y2WKb3QCw8GwITh2Fe90'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
