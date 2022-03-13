import { NgModule } from '@angular/core';
import { AutofocusDirective } from '../directives/autofocus.directive';
import { CheckCountryExistsDirective } from '../directives/check-country-exists.directive';
import { ClearControlFieldByClick } from '../directives/clear-control-field-by-click.directive';
import { FocusNextDirective } from '../directives/focus-next.directive';
import { InputFormatDirective } from '../directives/input-format.directive';
import { LazyImgDirective } from '../directives/lazy-img.directive';

const directives: any[] = [
  InputFormatDirective,
  ClearControlFieldByClick,
  LazyImgDirective,
  CheckCountryExistsDirective,
  AutofocusDirective,
  FocusNextDirective,
]

@NgModule({
  declarations: [directives],
  exports: [directives]
})
export class DirectiveModule { }
