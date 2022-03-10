import { Directive, HostListener, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[dirClearControlFieldByClick]'
})
export class ClearControlFieldByClick {

  constructor() { }

  // send control from DOM through this line, e.g, [dirClearControlFieldByClick]="CountryFilterCtrl"
  @Input('dirClearControlFieldByClick') control!: AbstractControl;

  @HostListener('click', ['$event.target'])
  public onClick(): void {
    if (this.control.value) {
      this.control.setValue("");
    }
  }
}
