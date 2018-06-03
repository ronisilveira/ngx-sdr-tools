import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[sdrFieldValidation]'
})
export class FieldValidationDirective {

  @Input()
  sdrFieldValidation: string;

  constructor() { }

}
