import { Injectable, EventEmitter } from '@angular/core';
import { PageDef } from './page-def';

@Injectable()
export class SdrPaginationService {

  constructor() { }

  pageChangeEmitter = new EventEmitter<PageDef>();

  changePagination(pageDef: PageDef) {
    this.pageChangeEmitter.emit(pageDef);
  }
}
