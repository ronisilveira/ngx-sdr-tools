import { Directive, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { FieldValidationDirective } from './field-validation.directive';
import { SdrValidationService } from './sdr-validation.service';

@Directive({
  selector: '[sdrShowOnError]'
})
export class ShowOnErrorDirective implements OnInit {

  constructor(
    private sdrFieldValidation: FieldValidationDirective,
    private validationService: SdrValidationService,
    private template: TemplateRef<any>,
    private container: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.validationService.errorEmitter.subscribe(errors => {
      this.container.clear();
      if (errors.has(this.sdrFieldValidation.sdrFieldValidation))
        this.container.createEmbeddedView(this.template);
    });
  }
}
