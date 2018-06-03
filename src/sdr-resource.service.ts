import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';

import { PageDef } from './page-def';
import { SdrPaginationService } from './sdr-pagination.service';
import { SdrValidationService } from './sdr-validation.service';

@Injectable()
export class SdrResourceService {

  baseUri: string;

  uri: string;

  resultEmitter = new EventEmitter<any[]>();

  private lastSearch: any;

  constructor(
    private http: HttpClient,
    private paginationService: SdrPaginationService,
    private validationService: SdrValidationService
  ) { }

  public setBaseUri(baseUri: string) {
    this.baseUri = baseUri;
  }

  public setUri(uri: string) {
    this.uri = uri;
  }

  public search(search: any): Observable<any[]> {

    let serachUri = this.baseUri + this.uri;

    if (search.uri != null)
      serachUri = serachUri + '/search/' + search.uri;

    let hasQuery = false;
    Object.keys(search).forEach(key => {

      if (key != "uri") {
        if (!hasQuery) {
          serachUri = serachUri + "?";
          hasQuery = true;
        } else {
          serachUri = serachUri + "&"
        }
        serachUri = serachUri + key + "=" + search[key];
      }
    });

    this.http.get(serachUri).subscribe(response => {
      this.resultEmitter.emit(response['_embedded'][this.uri]);
      this.paginationService.changePagination(response['page']);
    });

    this.lastSearch = search;
    return this.resultEmitter;
  }

  public searchResult(): Observable<any[]> {
    return this.resultEmitter;
  }

  public getAll(): Observable<any[]> {

    this.lastSearch = {};
    return this.search(this.lastSearch);
  }

  public gotoPage(page: number) {

    this.lastSearch['page'] = page;
    this.search(this.lastSearch);
  }

  public sortBy(field: string) {

    if (field.localeCompare(this.lastSearch['sort']) == 0) {
      this.lastSearch['sort'] = field + ",desc";
    } else {
      this.lastSearch['sort'] = field;
    }

    this.search(this.lastSearch);
  }

  public refresh() {
    this.search(this.lastSearch);
  }

  public get(id: string): Observable<any> {

    let uri = this.baseUri + this.uri + "/" + id;
    return this.http.get(uri);
  }

  private handleValidationError(error) {
    if (error.status === 400) {
      this.validationService.addErrors(error.error)
      return Observable.empty();
    } else {
      return Observable.throw(error);  
    }  
  }

  public post(obj: any): Observable<any> {

    let uri = this.baseUri + this.uri;
    return this.http.post(uri, obj).catch(error => this.handleValidationError(error));
  }

  public put(obj: any): Observable<any> {

    let uri = obj._links.self.href;
    return this.http.put(uri, obj).catch(error => this.handleValidationError(error));
  }

  public patch(id: string, obj: any): Observable<any> {

    let uri = this.baseUri + this.uri + "/" + id;
    return this.http.patch(uri, obj).catch(error => this.handleValidationError(error));
  }

  public delete(obj: any): Observable<any> {

    let uri = obj._links.self.href;
    return this.http.delete(uri).catch(error => this.handleValidationError(error));
  }
}
