import { Directive, HostListener, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[dirClearControlField]'
})
export class ClearControlFieldDirective {

  constructor() { }

  // send control from DOM through this line, e.g, [dirClearControlField]="CountryFilterCtrl"
  @Input('dirClearControlField') control!: AbstractControl;

  @HostListener('click', ['$event'])
  public onClick(): void {
    if (this.control.value) {
      this.control.setValue("");
    }
  }
}
