import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from 'src/app/material.module';
import { Storage } from 'src/app/models';
import { TranslationService, ListService, GenreService } from 'src/app/services';
import { TranslatePipe } from 'src/app/pipes';

import { ListFilterComponent, ListComponent, ListPageComponent } from 'src/app/components';

describe('ListPageComponent', () => {
  let component: ListPageComponent;
  let fixture: ComponentFixture<ListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([{ path: 'list', component: ListPageComponent }]),
        MaterialModule,
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' },
        TranslationService,
        ListService,
        GenreService,
        TranslatePipe
      ],
      declarations: [
        ListFilterComponent,
        ListComponent,
        ListPageComponent,
        TranslatePipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
