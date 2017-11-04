import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { appRouting } from './app-routing';
import { UserListComponent } from './user-list/user-list.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { AgmCoreModule } from '@agm/core';
import { ControlMessagesComponent } from './control-messages/control-messages.component';
import { ProjectService } from './project.service';
import { UserItemComponent } from './user-item/user-item.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    UserListComponent,
    GoogleMapComponent,
    ControlMessagesComponent,
    UserItemComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRouting,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCXQuy-ESvHy_6Y2WKb3QCw8GwITh2Fe90'
    })
  ],
  providers: [
    ProjectService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
