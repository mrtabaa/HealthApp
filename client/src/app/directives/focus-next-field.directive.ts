import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFocusNextField]'
})
export class FocusNextFieldDirective {

  constructor(private el: ElementRef) { }

  @HostListener('blur') getField() {
    let value: string = this.el.nativeElement.value;
    console.log(value);
    this.el.nativeElement.value = value.toUpperCase();
    console.log(value);
  }

}
