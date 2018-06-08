import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import * as moment from 'moment';
const uuidv1 = require('uuid/v1');

import { MatPaginator, MatSort } from '@angular/material';

import { Storage, Book, BookFilter, Page } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  $filter: Subject<BookFilter> = new Subject<BookFilter>();
  pageSizeOptions: number[] = [5, 10, 25, 50];
  pageSize: number = 25;
  defaultOrderActive: string = 'published';
  defaultOrderDirection: string = 'asc';

  constructor() {}

  fetch(): Observable<Book[]> {
    return Storage.getItem('list');
  }

  create(data: Book): Observable<Book> {
    data.id = uuidv1();

    return this.fetch()
               .switchMap((list: Book[]) => {
                 (list || []).push(data);

                 return Storage.setItem('list', list);
               })
               .map(() => data);
  }

  read(id: string): Observable<Book> {
    if (!id) {
      return Observable.of(null);
    }

    return Storage.getItem('list').map((list: Book[]) => {
      return (list || []).find((next: Book) => next.id === id);
    });
  }

  update(data: Book): Observable<Book> {
    return this.fetch()
               .switchMap((list: Book[]) => {
                 const index = (list || []).findIndex((next: Book) => next.id === data.id);

                 if (!index) {
                   return Observable.of(false);
                 }

                 list.splice(index, 1, data);

                 return Storage.setItem('list', list);
               })
               .map(() => data);
  }

  $delete(id: string): Observable<string> {
    if (!id) {
      return Observable.of(null);
    }

    return this.fetch()
               .switchMap((list: Book[]) => {
                 list = (list || []).filter((next: Book) => next.id !== id);

                 return Storage.setItem('list', list);
               })
               .map(() => id);
  }

  getPage(paginator: MatPaginator, filter: BookFilter, order: MatSort): Observable<Page> {
    return this.fetch()
               .map((list: Book[]) => {
                 const pageSize = paginator.pageSize ? paginator.pageSize : this.pageSize;
                 const offset = paginator.pageIndex * pageSize;
                 const nextList = (list || []).filter(this.onFilterData(filter));

                 nextList.sort(this.onSortData(order));

                 return {
                   list: nextList.slice(offset, offset + pageSize),
                   size: nextList.length
                 };
               });
  }

  onFilterData(filter: BookFilter) {
    const filterSearch = filter.search ? filter.search.toLowerCase() : null;

    return (data: Book) => {
      if (filter.category && filter.category !== data.genre.category) {
        return false;
      }

      if (filter.genre && filter.genre !== data.genre.name) {
        return false;
      }

      if (filter.search &&
          (data.name.toLowerCase().indexOf(filterSearch) === -1 &&
           data.author.name.toLowerCase().indexOf(filterSearch) === -1)
         ) {
        return false;
      }

      return true;
    };
  }

  onSortData(order: MatSort) {
    const active = order.active ? order.active : this.defaultOrderActive;
    const direction = order.direction ? order.direction : this.defaultOrderDirection;
    const asc = direction === 'asc' ? 1 : -1;
    const desc = direction === 'desc' ? 1 : -1;

    switch(active) {
      case 'published': return this.onSortPublished('published', asc, desc);
      case 'author.name': return this.onSortAuthor('name', asc, desc);
      default: return this.onSortDefault(order.active, asc, desc);
    }
  }

  onSortDefault(key: string, asc: number, desc: number) {
    return (prev: Book, next: Book) => {
      if (prev[key] === next[key]) {
        return 0;
      }

      return prev[key] > next[key] ? asc : desc;
    };
  }

  onSortAuthor(key: string, asc: number, desc: number) {
    return (prev: Book, next: Book) => {
      if (prev.author[key] === next.author[key]) {
        return 0;
      }

      return prev.author[key] > next.author[key] ? asc : desc;
    };
  }

  onSortPublished(key: string, asc: number, desc: number) {
    return (prev: Book, next: Book) => {
      if (!prev.timestamp) {
        prev.timestamp = moment(prev.published).valueOf();
      }

      if (!next.timestamp) {
        next.timestamp = moment(next.published).valueOf();
      }

      if (prev.timestamp === next.timestamp) {
        return 0;
      }

      return prev.timestamp > next.timestamp ? asc : desc;
    };
  }

}
