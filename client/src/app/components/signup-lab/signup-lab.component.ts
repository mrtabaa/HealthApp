import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  stepperOrientation: Observable<StepperOrientation>;

  filteredCountries$!: Observable<any>;

  constructor(
    breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private countryListService: CountryListService) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));
  }

  ngOnInit() {
    this.filteredCountries$ = this.CountryFilterCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.countryListService.filterCountries(value))
      );

    this.combinePhoneNumber();
  }

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
    countryFilterCtrl: ['', Validators.required],
    phoneCountryCodeCtrl: ['', Validators.required],
    phoneNumberCtrl: ['', Validators.required],
    combinedPhoneNumberCtrl: ['', Validators.required]
  });

  contractFG = this.fb.group({
    thirdCtrl: ['', Validators.required]
  });

  // Forms return values
  get ContactInfoFG(): AbstractControl {
    return this.contactInfoFG;
  }
  get StreetCtrlCtrl(): AbstractControl {
    return this.contactInfoFG.get('streetCtrl') as FormControl;
  }
  get CountryFilterCtrl(): AbstractControl {
    return this.contactInfoFG.get('countryFilterCtrl') as FormControl;
  }
  get SelectedCountryCtrl(): AbstractControl {
    return this.contactInfoFG.get('selectedCountryCtrl') as FormControl;
  }
  get PhoneCountryCodeCtrl(): AbstractControl {
    return this.contactInfoFG.get('phoneCountryCodeCtrl') as FormControl;
  }
  get PhoneNumberCtrl(): AbstractControl {
    return this.contactInfoFG.get('phoneNumberCtrl') as FormControl;
  }
  get CombinedPhoneNumberCtrl(): AbstractControl {
    return this.contactInfoFG.get('combinedPhoneNumberCtrl') as FormControl;
  }

  // get from DOM (onSelectionChange)
  getSelectedCountry(country: ICountry, event: any): void {
    if (event.isUserInput) {  // check if the option is selected
      //set phoneNumber
      this.PhoneCountryCodeCtrl.setValue(country.code);
    }
  }

  // set from getSelectedCountry()
  combinePhoneNumber(): void {
    let code: string = "";
    let phone: string = "";

    this.PhoneCountryCodeCtrl.valueChanges.subscribe((value => {
      code = value;
      this.CombinedPhoneNumberCtrl.setValue(code + phone);
    }));
    this.PhoneNumberCtrl.valueChanges.subscribe((value => {
      phone = value;
      this.CombinedPhoneNumberCtrl.setValue(code + phone);
    }));
  }

  // other methods
  checkStatus(): void {
  }
}
