import { Directive, HostListener,Input } from '@angular/core';

import { SdrResourceService } from './sdr-resource.service';

@Directive({
  selector: '[sdrSortBy]'
})
export class SortByDirective {

  @Input("sdrSortBy")
  fieldSort: string;

  constructor(
    private resourceService: SdrResourceService
  ) { }

  @HostListener('click')
  onClick() {
    this.resourceService.sortBy(this.fieldSort);
  }
}
