import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SdrValidationService {

  errors = new Map<string, string>();

  errorEmitter = new EventEmitter<Map<string, string>>();

  constructor() { }

  addErrors(error: any) {

    this.errors.clear();
    error.errors.forEach(err => this.errors.set(err.property, err.message));
    this.errorEmitter.emit(this.errors);
  }
}
