import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from 'src/app/material.module';
import { Storage } from 'src/app/models';
import { TranslationService, ListService, GenreService } from 'src/app/services';
import { TranslatePipe } from 'src/app/pipes';

import { ListComponent } from 'src/app/components';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([{ path: '', component: ListComponent }]),
        MaterialModule,
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' },
        TranslationService,
        ListService,
        GenreService,
        TranslatePipe
      ],
      declarations: [ ListComponent, TranslatePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
