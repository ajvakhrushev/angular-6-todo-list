import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PLATFORM_ID, Inject } from '@angular/core';
import { APP_BASE_HREF, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from 'src/app/router.module';
import { MaterialModule } from 'src/app/material.module';

import { AppComponent } from 'src/app/app.component';
import {
  PageNotFoundComponent,
  HeaderComponent,
  ListComponent,
  ListFilterComponent,
  ListPageComponent,
  DetailComponent
} from 'src/app/components';

import { Storage } from 'src/app/models';

import { TranslationService, ListService, GenreService } from 'src/app/services';

import { TranslatePipe } from 'src/app/pipes';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderComponent,
    ListComponent,
    ListFilterComponent,
    DetailComponent,
    TranslatePipe,
    ListPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule.withServerTransition({
      appId: 'crud-angular'
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue : '/' },
    TranslationService,
    ListService,
    GenreService,
    TranslatePipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    let storage: string; 

    if (isPlatformBrowser(this.platformId)) {
      storage = 'localStorage';
    } else if (isPlatformServer(this.platformId)) {
      storage = 'offline';
    }

    this.initializeData(storage);
  }

  initializeData(storageType: string) {
    if (!storageType) {
      return;
    }

    const keys: string[] = ['translations', 'list', 'genres', 'categories'];

    Storage.setStorage(storageType);

    keys.forEach((next: string) => {
      Storage.getItem(next).subscribe((data: any) => {
        if (data !== null) {
          return;
        }

        Storage.setItem(next, require(`src/assets/fixture/${next}.json`));
      });
    });
  }
}
