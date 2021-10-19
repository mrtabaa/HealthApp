import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CountryListService } from 'src/app/services/country-list.service';
import { ICountry } from 'src/app/models/Icountry';

@Component({
  selector: 'app-signup-lab',
  templateUrl: './signup-lab.component.html',
  styleUrls: ['./signup-lab.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class SignupLabComponent implements OnInit {

  filteredCountries$!: Observable<ICountry[]>;

  constructor(
    breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private countryListService: CountryListService) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));
  }

  stepperOrientation: Observable<StepperOrientation>;

  // Forms variables
  labInfoFG = this.fb.group({
    labNameCtrl: ['', Validators.required],
    labIdCtrl: ['', Validators.required],
    emailCtrl: ['', Validators.required]
  });

  contactInfoFG = this.fb.group({
    streetCtrl: ['', Validators.required],
    unitCtrl: ['',],
    cityCtrl: ['', Validators.required],
    stateCtrl: ['', Validators.required],
    zipCtrl: ['', Validators.required],
    countryCtrl: ['', { Validators: [Validators.required], asyncValidators: [], updateOn: 'change' }],
    phoneCountryCode: ['', Validators.required],
    phoneNumberCtrl: ['', Validators.required]
  });

  contractFG = this.fb.group({
    thirdCtrl: ['', Validators.required]
  });

  // Forms return values

  // other methods
  checkStatus(): void {
    console.log(this.labInfoFG);
  }

  clearStreet() {

  }

  ngOnInit(): void {
    this.filteredCountries$ = this.CountryCtrl?.value.valueChanges
    .pipe(
      startWith(''),
      map((country: string) => country ? this.countryListService.filterCountries(country) : this.countryListService.countries.slice())
    );
  }

  get CountryCtrl(): AbstractControl | null {
    return this.contactInfoFG.get('countryCtrl');
  }
}