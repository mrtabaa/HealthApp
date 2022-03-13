import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CountryListService } from '../services/country-list.service';

@Directive({
  selector: '[dirCheckCountryExists]'
})

// check if the user input country exists
export class CheckCountryExistsDirective {

  constructor(private countryListService: CountryListService, private el: ElementRef) { }

  // Pass in multiple inputs: two controllers
  @Input('dirCheckCountryExists') selectedCountryCtrl!: AbstractControl;
  @Input('dirSecondInput') countryFilterCtrl!: AbstractControl;

  @HostListener('focusout') onBlur() {
    if (this.selectedCountryCtrl.invalid)
      this.countryFilterCtrl.setValue("");
    // else
    //   this.countryFilterCtrl.
  }
}
