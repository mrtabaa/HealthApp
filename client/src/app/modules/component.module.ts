import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

// directives
import { LazyImgDirective } from '../directives/lazy-img.directive';
import { InputFormatDirective } from '../directives/input-format.directive';
import { ClearControlFieldByClick } from '../directives/clear-control-field-by-click.directive';
import { CheckCountryExistsDirective } from '../directives/check-country-exists.directive';
import { AutofocusDirective } from '../directives/autofocus.directive';

// components
import { HomeComponent } from '../components/home/home.component';
import { SignupLabComponent } from '../components/signup-lab/signup-lab.component';
import { LoginComponent } from '../components/login/login.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { NoAccessComponent } from '../components/no-access/no-access.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';

const components = [
  InputFormatDirective,
  ClearControlFieldByClick,
  LazyImgDirective,
  CheckCountryExistsDirective,
  AutofocusDirective,

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
    ReactiveFormsModule,
  ],
  exports: [components]
})
export class ComponentModule { }
