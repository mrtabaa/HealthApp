import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CountryListService } from 'src/app/services/country-list.service';
import { ICountry } from 'src/app/models/Icountry';
import { SignupLabValidators } from './helpers/signup-lab.validator';

@Component({
  selector: 'app-signup-lab',
  templateUrl: './signup-lab.component.html',
  styleUrls: ['./signup-lab.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class SignupLabComponent implements OnInit {

  //#region global variables
  stepperOrientation: Observable<StepperOrientation>;
  filteredCountries$!: Observable<any>;
  //#endregion

  //#region Base
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
  //#endregion

  //#region Forms Group/controler
  labInfoFG = this.fb.group({
    labNameCtrl: ['', Validators.required],
    countryFilterCtrl: ['', Validators.required],
    selectedCountryCtrl: ['', Validators.required],
    governmentIdCtrl: ['', Validators.required],
    emailCtrl: ['', [
      Validators.required,
      Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    ]]
  });

  contactInfoFG = this.fb.group({
    phoneCountryCodeCtrl: ['', Validators.required],
    phoneNumberFG: this.fb.group({
      newPhoneNumberCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(13), Validators.pattern('^[0-9]*$')]],
      confirmPhoneNumberCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(13), Validators.pattern('^[0-9]*$')]]
    }, { validator: SignupLabValidators.confirmPhoneNumber }),
    combinedPhoneNumberCtrl: ['', Validators.required],
    streetCtrl: ['', [Validators.required, Validators.minLength(8)]],
    unitCtrl: ['', Validators.maxLength(12)],
    cityCtrl: ['', [Validators.required, Validators.maxLength(20)]],
    stateCtrl: ['', [Validators.required, Validators.maxLength(20)]],
    zipCtrl: ['', [Validators.required, Validators.maxLength(20)]],
    additionalInfoCtrl: ['', Validators.maxLength(500)],
  });

  contractFG = this.fb.group({
    thirdCtrl: ['', Validators.required]
  });
  //#endregion

  //#region Forms Properties
  // Lab's Info
  get CountryFilterCtrl(): AbstractControl {
    return this.labInfoFG.get('countryFilterCtrl') as FormControl;
  }
  get SelectedCountryCtrl(): AbstractControl {
    return this.labInfoFG.get('selectedCountryCtrl') as FormControl;
  }
  get GovernmentIdCtrl(): AbstractControl {
    return this.labInfoFG.get('governmentIdCtrl') as FormControl;
  }
  get EmailCtrl(): AbstractControl {
    return this.labInfoFG.get('emailCtrl') as FormControl;
  }

  // Contact Info
  get PhoneCountryCodeCtrl(): AbstractControl {
    return this.contactInfoFG.get('phoneCountryCodeCtrl') as FormControl;
  }
  get PhoneNumberFG(): AbstractControl{
    return this.contactInfoFG.get('phoneNumberFG') as FormGroup;
  }
  get NewPhoneNumberCtrl(): AbstractControl {
    return this.contactInfoFG.get('phoneNumberFG.newPhoneNumberCtrl') as FormControl;
  }
  get ConfirmPhoneNumberCtrl(): AbstractControl {
    return this.contactInfoFG.get('phoneNumberFG.confirmPhoneNumberCtrl') as FormControl;
  }
  get CombinedPhoneNumberCtrl(): AbstractControl {
    return this.contactInfoFG.get('combinedPhoneNumberCtrl') as FormControl;
  }
  get StreetCtrlCtrl(): AbstractControl {
    return this.contactInfoFG.get('streetCtrl') as FormControl;
  }
  get ContactInfoFG(): AbstractControl {
    return this.contactInfoFG.get('contactInfoFG') as FormGroup
  }

  // Sign Contract
  // ...
  // Review and Submit
  // ...

  //#endregion


  //#region Methods
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
    this.NewPhoneNumberCtrl.valueChanges.subscribe((value => {
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

  moveFocusToNext(leaveFocus: HTMLInputElement, gainFocus: HTMLInputElement): void {
    setTimeout(() => {
      leaveFocus.blur();
      gainFocus.focus();
    });
  }

  // other methods
  checkStatus(): void {
    console.log(this.PhoneNumberFG);
  }

  clearStreet() {
    this.StreetCtrlCtrl.setValue("");
    this.StreetCtrlCtrl.reset();
  }

  clearFlag() {
    this.SelectedCountryCtrl.setErrors({ required: true });
  }
  //#endregion
}
