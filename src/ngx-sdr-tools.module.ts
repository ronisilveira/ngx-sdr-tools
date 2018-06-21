import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SdrResourceService } from './sdr-resource.service';
import { SdrPaginationService } from './sdr-pagination.service';
import { SdrValidationService } from './sdr-validation.service';
import { FirstPageDirective } from './first-page.directive';
import { LastPageDirective } from './last-page.directive';
import { PriorPageDirective } from './prior-page.directive';
import { NextPageDirective } from './next-page.directive';
import { ForEachPageDirective } from './for-each-page.directive';
import { PageDirective } from './page.directive';
import { SortByDirective } from './sort-by.directive';
import { ErrorClassDirective } from './error-class.directive';
import { FieldValidationDirective } from './field-validation.directive';
import { ErrorMessageDirective } from './error-message.directive';
import { ShowOnErrorDirective } from './show-on-error.directive';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    FirstPageDirective,
    LastPageDirective,
    PriorPageDirective,
    NextPageDirective,
    ForEachPageDirective,
    PageDirective,
    SortByDirective,
    ErrorClassDirective,
    FieldValidationDirective,
    ErrorMessageDirective,
    ShowOnErrorDirective
  ],
  exports: [
    FirstPageDirective,
    LastPageDirective,
    PriorPageDirective,
    NextPageDirective,
    ForEachPageDirective,
    PageDirective,
    SortByDirective,
    ErrorClassDirective,
    FieldValidationDirective,
    ErrorMessageDirective,
    ShowOnErrorDirective
  ]
})
export class NgxSdrToolsModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxSdrToolsModule,
      providers: [
        SdrPaginationService,
        SdrValidationService,
        SdrResourceService
      ]
    }
  }
}
