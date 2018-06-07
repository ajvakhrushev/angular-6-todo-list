import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _moment from 'moment';
const cloneDeep = require('lodash.clonedeep');

import { Book, DetailStrategy, SelectOption, urlValidator } from 'src/app/models';

import { ListService, GenreService } from 'src/app/services';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  isLoading: boolean = false;
  item: Book;
  stableItem: Book;
  formGroup: FormGroup;
  authorForm: FormGroup;
  genreForm: FormGroup;
  nameControl: FormControl;
  coverControl: FormControl;
  authorAvatarControl: FormControl;
  genres: SelectOption[] = [];
  categories: SelectOption[] = [];
  strategy: any;
  strategies = [
    {
      key: 'create',
      init: (id: string) => {
        this.item = {
          id: null,
          name: null,
          genre: {
            name: null,
            category: null
          },
          author: {
            name: null
          },
          published: null
        };

        this.isLoading = false;
      },
      submit: (data: Book) => {
        if (!data) {
          this.isLoading = false;
          return;
        }

        this.listService.create(data).subscribe((nextData: Book) => {
          this.strategy = this.strategies.find((next: DetailStrategy) => next.key === 'update');

          this.mapData(nextData);
        });
      },
    },
    {
      key: 'update',
      init: (id: string) => {
        this.listService.read(id).subscribe(this.mapData);
      },
      submit: (data: Book) => {
        if (!data) {
          return;
        }

        this.listService.update(data).subscribe(this.mapData);
      },
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private listService: ListService,
    private genreService: GenreService
  ) {
    this.nameControl = new FormControl('', [Validators.required]);
    this.coverControl = new FormControl(null, [urlValidator]);
    this.authorAvatarControl = new FormControl(null, [urlValidator]);

    this.authorForm = new FormGroup ({
      name: new FormControl(null, [Validators.required]),
      avatar: this.authorAvatarControl
    });

    this.genreForm = new FormGroup ({
      name: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required])
    });

    this.formGroup = new FormGroup ({
      name: this.nameControl,
      genre: this.genreForm,
      author: this.authorForm,
      published: new FormControl(null),
      cover: this.coverControl,
      description: new FormControl(null),
      introduction: new FormControl(null)
    });

    this.mapData = this.mapData.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (!params.id) {
        return;
      }

      let strategy: string;

      switch(params.id) {
        case 'create':
          strategy = 'create';
        default:
          strategy = 'update';
      }

      this.strategy = this.strategies.find((next: DetailStrategy) => next.key === strategy);
      this.isLoading = true;

      this.strategy.init(params.id);
    });

    this.genreService.getGenres().subscribe((data: SelectOption[]) => this.genres = data);
    this.genreService.getCategories().subscribe((data: SelectOption[]) => this.categories = data);
  }

  mapData(data: Book) {
    this.item = data;
    this.stableItem = cloneDeep(data);
    this.isLoading = false;

    this.setFormValues(this.item);
  }

  setFormValues(data: Book) {
    this.authorForm.setValue({
      name: data.author.name,
      avatar: data.author.avatar
    });

    this.genreForm.setValue({
      name: data.genre.name,
      category: data.genre.category
    });

    this.formGroup.setValue({
      name: data.name,
      genre: {
        name: data.genre.name,
        category: data.genre.category
      },
      author: {
        name: data.author.name,
        avatar: data.author.avatar
      },
      published: data.published,
      cover: data.cover,
      description: data.description,
      introduction: data.introduction
    });
  }

  onCancel() {
    this.router.navigate(['/list']);
  }

  onReset() {
    this.item = cloneDeep(this.stableItem);

    this.setFormValues(this.item);
  }

  onSubmit() {
    this.isLoading = true;

    this.strategy.submit(this.item);
  }

}
