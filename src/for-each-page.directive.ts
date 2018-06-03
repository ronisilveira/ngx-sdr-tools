import { Directive, OnInit, TemplateRef, ViewContainerRef, Output, Injectable } from '@angular/core';

import { PageDef } from './page-def';
import { SdrPaginationService } from './sdr-pagination.service';

export class PageContext {
  constructor(public $implicit: number) {};
}

@Directive({
  selector: '[sdrForEachPage]'
})
export class ForEachPageDirective implements OnInit {

  pageDef: PageDef;

  constructor(
    private paginationService: SdrPaginationService,
    private template: TemplateRef<PageContext>,
    private container: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.paginationService.pageChangeEmitter.subscribe(pagedef => {

      if (this.pageDef == null || this.pageDef.totalPages != pagedef.totalPages) {
        this.container.clear();
        for (let idx = 1; idx <= pagedef.totalPages; idx++) {
          this.container.createEmbeddedView(this.template, new PageContext(idx));
        }
      }

      this.pageDef = pagedef;
    });
  }
}
