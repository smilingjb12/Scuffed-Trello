import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CATEGORIES } from './constants';
import { Lookup } from './ticket-board/models/ticket-board.model';

@Injectable({
  providedIn: 'root'
})
export class LookupDataService {

  constructor() { }

  getCategories(): Observable<Lookup[]> {
    const items = Object.keys(CATEGORIES).map(name => ({ id: CATEGORIES[name], text: name }));
    return of(items);
  }
}
