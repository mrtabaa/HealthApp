import { Directive, HostListener, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[dirCheckCountryExists]'
})

// check if the user input country exists
export class CheckCountryExistsDirective {

  constructor() { }

  // Pass in multiple inputs: two controllers
  @Input('dirCheckCountryExists') selectedCountryCtrl!: AbstractControl;
  @Input('dirSecondInput') countryFilterCtrl!: AbstractControl;

  @HostListener('focusout') onBlur() {
    if (this.selectedCountryCtrl.invalid)
      this.countryFilterCtrl.setValue("");
  }
}
