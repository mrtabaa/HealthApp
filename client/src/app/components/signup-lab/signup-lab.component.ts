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
    // filter country with user input
    this.filterCountries();

    // when no country is selected
    this.hideCountryFlag();

    // combine country code and the number
    this.combinePhoneNumber();
  }

  // Forms variables
  labInfoFG = this.fb.group({
    labNameCtrl: ['', Validators.required],
    countryFilterCtrl: ['', Validators.required],
    selectedCountryCtrl: ['', Validators.required],
    labIdCtrl: ['', Validators.required],
    emailCtrl: ['', Validators.required]
  });

  contactInfoFG = this.fb.group({
    streetCtrl: ['', [Validators.required, Validators.minLength(8)]],
    unitCtrl: ['',],
    cityCtrl: ['', Validators.required],
    stateCtrl: ['', Validators.required],
    zipCtrl: ['', Validators.required],
    additionalInfoCtrl: ['',],
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
    return this.labInfoFG.get('countryFilterCtrl') as FormControl;
  }
  get SelectedCountryCtrl(): AbstractControl {
    return this.labInfoFG.get('selectedCountryCtrl') as FormControl;
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

  // ngOnInit
  filterCountries(): void {
    this.filteredCountries$ = this.CountryFilterCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.countryListService.filterCountries(value))
      );
  }

  // if no country is selected
  // ngOnInit
  hideCountryFlag(): void {
    this.CountryFilterCtrl.valueChanges.subscribe(value => {
      if (value.length < 2) {
        this.SelectedCountryCtrl.setErrors({ 'invalid': true });
      }
    })
  }

  // set from getSelectedCountry()
  // ngOnInit
  combinePhoneNumber(): void {
    let code: string = "";
    let phone: string = "";

    this.PhoneCountryCodeCtrl.valueChanges.subscribe((value => {
      code = value;
      this.CombinedPhoneNumberCtrl.setValue(code + phone, { emitEvent: false });
    }));
    this.PhoneNumberCtrl.valueChanges.subscribe((value => {
      phone = value;
      this.CombinedPhoneNumberCtrl.setValue(code + phone, { emitEvent: false });
    }));
  }

  // get from DOM (onSelectionChange)
  getSelectedCountry(country: ICountry, event: any): void {
    if (event.isUserInput) {  // check if the option is selected
      //set phoneNumber
      this.SelectedCountryCtrl.setValue(country);
      this.PhoneCountryCodeCtrl.setValue(country.code);
    }
  }

  // other methods
  checkStatus(): void {
  }

  clearStreet() {
    this.StreetCtrlCtrl.setValue("");
    this.StreetCtrlCtrl.reset();
  }
  clearCountry() {
    this.CountryFilterCtrl.setValue("");
  }

  clearFlag() {
    this.SelectedCountryCtrl.setErrors({ required: true });
  }
}
