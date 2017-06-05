var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { appRouting } from './app-routing';
import { UserListComponent } from './user-list/user-list.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { ControlMessagesComponent } from './control-messages/control-messages.component';
import { ProjectService } from './project.service';
import { UserItemComponent } from './user-item/user-item.component';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            HomepageComponent,
            UserListComponent,
            GoogleMapComponent,
            ControlMessagesComponent,
            UserItemComponent
        ],
        imports: [
            BrowserModule,
            FormsModule,
            ReactiveFormsModule,
            HttpModule,
            BrowserAnimationsModule,
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
], AppModule);
export { AppModule };
//# sourceMappingURL=/var/www/html/check-in/src/app/app.module.js.map