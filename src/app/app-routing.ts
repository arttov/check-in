import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';


const appRoutes: Routes = [
  { path: '', component: HomepageComponent }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
