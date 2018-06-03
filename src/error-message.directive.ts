import { Directive, ElementRef, OnInit } from '@angular/core';

import { FieldValidationDirective } from './field-validation.directive';
import { SdrValidationService } from './sdr-validation.service';

@Directive({
  selector: '[sdrErrorMessage]'
})
export class ErrorMessageDirective implements OnInit {

  constructor(
    private sdrFieldValidation: FieldValidationDirective,
    private validationService: SdrValidationService,
    private element: ElementRef,
  ) { }

  ngOnInit(): void {
    this.validationService.errorEmitter.subscribe(errors => {
      this.element.nativeElement.textContent = errors.get(this.sdrFieldValidation.sdrFieldValidation);
    });
  }
}
