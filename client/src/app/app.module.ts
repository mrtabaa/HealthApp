import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ComponentModule } from './modules/component.module';
import { FormsModule } from '@angular/forms';
import { CountryListService } from './services/country-list.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    ComponentModule,
  ],
  providers: [CountryListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
