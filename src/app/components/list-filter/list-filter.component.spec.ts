import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from 'src/app/material.module';
import { Storage } from 'src/app/models';
import { TranslationService } from 'src/app/services';
import { TranslatePipe } from 'src/app/pipes';

import { ListFilterComponent } from 'src/app/components';

describe('ListFilterComponent', () => {
  let component: ListFilterComponent;
  let fixture: ComponentFixture<ListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MaterialModule
      ],
      providers: [
        TranslationService,
        TranslatePipe
      ],
      declarations: [ ListFilterComponent, TranslatePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
