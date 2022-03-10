import { Directive, ElementRef, HostListener } from '@angular/core';
import { CountryListService } from '../services/country-list.service';

@Directive({
  selector: '[dirCheckCountryExists]'
})
export class CheckCountryExistsDirective {

  constructor(private countryListService: CountryListService, private el: ElementRef) { }

  @HostListener('blur') onBlur() {
    let value: string = this.el.nativeElement.value;

    console.log(value);
  }
}
