import { Directive, OnInit, HostListener } from '@angular/core';

import { SdrPaginationService } from './sdr-pagination.service';
import { SdrResourceService } from './sdr-resource.service';
import { PageDef } from './page-def';

@Directive({
  selector: '[sdrFirstPage]'
})
export class FirstPageDirective implements OnInit {

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
    if (this.pageDef.number != 0)
      this.resourceService.gotoPage(0);
  }
}
