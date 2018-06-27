import { Directive, HostListener, OnInit, TemplateRef, EmbeddedViewRef, Input } from '@angular/core';

import { SdrResourceService } from './sdr-resource.service';
import { PageDef } from './page-def';
import { SdrPaginationService } from './sdr-pagination.service';

@Directive({
  selector: '[sdrPage]'
})
export class PageDirective implements OnInit {

  pageDef: PageDef;

  @Input("sdrPage")
  pageNumber: number;

  constructor(
    private paginationService: SdrPaginationService,
    private resourceService: SdrResourceService
  ) { }

  ngOnInit(): void {
    this.paginationService.pageChangeEmitter.subscribe(pagedef => this.pageDef = pagedef);
  }

  @HostListener('click')
  onClick() {
    if (this.pageDef == null || this.pageDef.number != this.pageNumber - 1)
      this.resourceService.gotoPage(this.pageNumber - 1);

    return false;
  }
}
