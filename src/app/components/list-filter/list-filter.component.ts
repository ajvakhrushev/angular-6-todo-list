import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
const isEqual = require('lodash.isequal');

import { BookFilter, SelectOption } from 'src/app/models';

import { ListService, GenreService } from 'src/app/services';

@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.css']
})
export class ListFilterComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  filterSubscription: Subscription;
  genres: SelectOption[] = [];
  categories: SelectOption[] = [];

  constructor(

    private listService: ListService,
    private genreService: GenreService
  ) {
    this.formGroup = new FormGroup ({
      search: new FormControl(''),
      genre: new FormControl(null),
      category: new FormControl(null)
    });

    this.formGroup.valueChanges.subscribe((value) => {
      console.log(this.formGroup.value);
      this.listService.$filter.next(this.formGroup.value);
    })

    this.filterSubscription = this.listService.$filter.subscribe((data: BookFilter) => {
      if (isEqual(data, this.formGroup.value)) {
        return;
      }

      this.formGroup.setValue(data);
    });
  }

  ngOnInit() {
    this.genreService.getGenres().subscribe((data: SelectOption[]) => this.genres = data);
    this.genreService.getCategories().subscribe((data: SelectOption[]) => this.categories = data);
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }

}
