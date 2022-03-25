import { NgModule } from '@angular/core';
import { CheckCountryExistsDirective } from '../directives/check-country-exists.directive';
import { ClearControlFieldByClickDirective } from '../directives/clear-control-field-by-click.directive';
import { InputFormatDirective } from '../directives/input-format.directive';
import { LazyImgDirective } from '../directives/lazy-img.directive';
import { AutofocusDirective } from '../directives/autofocus.directive';

const directives: any[] = [
  InputFormatDirective,
  CheckCountryExistsDirective,
  ClearControlFieldByClickDirective,
  LazyImgDirective,
  AutofocusDirective,
]

@NgModule({
  declarations: [directives],
  exports: [directives]
})
export class DirectiveModule { }
