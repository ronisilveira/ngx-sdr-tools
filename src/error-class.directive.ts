import { Directive, Input, OnInit, ElementRef, Renderer } from '@angular/core';

import { SdrValidationService } from './sdr-validation.service';
import { FieldValidationDirective } from './field-validation.directive';

@Directive({
  selector: '[sdrErrorClass]'
})
export class ErrorClassDirective implements OnInit {

  @Input()
  sdrErrorClass: string;

  constructor(
    private sdrFieldValidation: FieldValidationDirective,
    private validationService: SdrValidationService,
    private element: ElementRef,
    private renderer: Renderer
  ) { }

  ngOnInit(): void {
    this.validationService.errorEmitter.subscribe(errors => {
      if (this.sdrErrorClass) {
        this.sdrErrorClass.split(" ").forEach(value => 
          this.renderer.setElementClass(
            this.element.nativeElement, 
            value, 
            this.validationService.errors.has(this.sdrFieldValidation.sdrFieldValidation)
          )
        )
      }
    });
  }
}
