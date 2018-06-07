import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, of as observableOf, merge } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
const cloneDeep = require('lodash.clonedeep');

import { MatPaginator, MatSort, MatTable } from '@angular/material';

import { Book, BookFilter, Page } from 'src/app/models';

import { ListService } from 'src/app/services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns = ['update', 'name', 'author.name', 'genre.name', 'genre.category', 'published', 'likes', 'delete'];
  data: Book[] = [];
  resultsLength = 0;
  isLoading = true;
  isRateLimitReached = false;
  filter: BookFilter = <BookFilter>{};
  onListChangesSubscription: Subscription;
  pageSizeOptions: number[];

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private listService: ListService
  ) {
    this.pageSizeOptions = cloneDeep(this.listService.pageSizeOptions);

    this.refresh = this.refresh.bind(this);
    this.onGetDataSuccess = this.onGetDataSuccess.bind(this);
    this.onGetDataError = this.onGetDataError.bind(this);
  }

  ngOnInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.listService.$filter.subscribe((data: BookFilter) => {
      this.filter = data;
      this.paginator.pageIndex = 0
    });

    merge(this.paginator.page, this.listService.$filter, this.sort.sortChange)
      .startWith([{}, <BookFilter>{}, {}])
      .switchMap(() => {
        this.isLoading = true;

        return this.listService.getPage(this.paginator, this.filter, this.sort);
      })
      .subscribe(
        this.onGetDataSuccess,
        this.onGetDataError
      );
  }

  updateItem(id: string) {
    if (!id) {
      return;
    }

    this.router.navigate(['detail', id]);
  }

  deleteItem(id: string) {
    this.isLoading = true;

    this.listService
        .$delete(id)
        .switchMap(() => {
          return this.listService.getPage(this.paginator, this.filter, this.sort);
        })
        .subscribe(
          this.onGetDataSuccess,
          this.onGetDataError
        );
  }

  refresh() {}

  onGetDataSuccess(data: Page) {
    this.isLoading = false;
    this.resultsLength = data.size;
    this.data = data.list;
  }

  onGetDataError(error) {
    this.isLoading = false;
    this.resultsLength = 0;
    this.data = [];
    console.log(error);
  }

}
