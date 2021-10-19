import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-signup-lab',
  templateUrl: './signup-lab.component.html',
  styleUrls: ['./signup-lab.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class SignupLabComponent implements OnInit {
  constructor(private fb: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));
  }

  stepperOrientation: Observable<StepperOrientation>;

  // Forms variables
  LabInfoFG = this.fb.group({
    labNameCtrl: ['', Validators.required],
    labIdCtrl: ['', Validators.required],
    emailCtrl: ['', Validators.required]
  });

  ContactInfoFG = this.fb.group({
    streetCtrl: ['', Validators.required],
    unitCtrl: ['',],
    cityCtrl: ['', Validators.required],
    stateCtrl: ['', Validators.required],
    zipCtrl: ['', Validators.required],
    countryCtrl: ['', Validators.required],
    phoneCountryCode: ['', Validators.required],
    phoneNumberCtrl: ['', Validators.required]
  });

  thirdFormGroup = this.fb.group({
    thirdCtrl: ['', Validators.required]
  });

  // Forms return values

  // other methods
  onCountryChange(event: any)
{
  console.log(event.dialCode);
  console.log(event.name);
  console.log(event.iso2);
  }
  checkStatus(): void {
    console.log(this.LabInfoFG);
  }

  clearStreet() {

  }

  ngOnInit(): void {
  }

}
