import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
// import { Ng2TelInputModule } from 'ng2-tel-input';

import { HomeComponent } from '../components/home/home.component';
import { SignupLabComponent } from '../components/signup-lab/signup-lab.component';
import { LoginComponent } from '../components/login/login.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { NoAccessComponent } from '../components/no-access/no-access.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';

const components = [
  HomeComponent,
  SignupLabComponent,
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
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  exports: [components]
})
export class ComponentModule { }
