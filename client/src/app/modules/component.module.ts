import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

import { HomeComponent } from '../components/home/home.component';
import { SignupHospitalComponent } from '../components/signup-hospital/signup-hospital.component';
import { LoginComponent } from '../components/login/login.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { NoAccessComponent } from '../components/no-access/no-access.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';

const components = [
  HomeComponent,
  SignupHospitalComponent,
  LoginComponent,
  NavbarComponent,
  NoAccessComponent,
  NotFoundComponent
]

@NgModule({
   declarations: [components],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  exports: [components]
})
export class ComponentModule { }
