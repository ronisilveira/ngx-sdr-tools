import { Directive, HostListener, OnInit } from '@angular/core';

import { SdrResourceService } from './sdr-resource.service';
import { PageDef } from './page-def';
import { SdrPaginationService } from './sdr-pagination.service';

@Directive({
  selector: '[sdrNextPage]'
})
export class NextPageDirective implements OnInit {

  pageDef: PageDef;

  constructor(
    private paginationService: SdrPaginationService,
    private resourceService: SdrResourceService
  ) { }

  ngOnInit(): void {
    this.paginationService.pageChangeEmitter.subscribe(pagedef => this.pageDef = pagedef);
  }

  @HostListener('click')
  onClick() {
    if (this.pageDef.number < this.pageDef.totalPages - 1)
      this.resourceService.gotoPage(this.pageDef.number + 1);

    return false;
  }
}
