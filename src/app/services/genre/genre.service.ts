import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Storage, SelectOption } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  genres: SelectOption[];
  categories: SelectOption[];

  constructor() { }

  getGenres(): Observable<SelectOption[]> {
    if (this.genres) {
      return Observable.of(this.genres);
    }

    return Storage.getItem('genres').map((data: string[]) => {
      this.genres = this.onGetSelectOptions(data);

      return this.genres;
    });
  }

  getCategories(): Observable<SelectOption[]> {
    if (this.categories) {
      return Observable.of(this.categories);
    }

    return Storage.getItem('categories').map((data: string[]) => {
      this.categories = this.onGetSelectOptions(data);

      return this.categories;
    });
  }

  onGetSelectOptions(data: string[] = []): SelectOption[] {
    const list = (data || []).map((next: string) => ({title: next, value: next}));

    list.unshift({title: 'None', value: null});

    return list;
  }

}
