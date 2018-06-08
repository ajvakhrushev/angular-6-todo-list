import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import {
  MatToolbarModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatSortModule,
  MatIconModule
} from '@angular/material';

import { AppComponent } from 'src/app/app.component';
import {
  PageNotFoundComponent,
  HeaderComponent,
  FooterComponent,
  ListComponent,
  ListItemComponent,
  ListFilterComponent,
  ListPageComponent,
  DetailComponent
} from 'src/app/components';

import {
  Storage
} from 'src/app/models';

import {
  TranslationService,
  ListService
} from 'src/app/services';

import { TranslatePipe } from 'src/app/pipes';
// import { SomeDirective } from 'src/app/directives';

const appRoutes: Routes = [
  { path: 'list', component: ListPageComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    ListComponent,
    ListItemComponent,
    ListFilterComponent,
    DetailComponent,
    TranslatePipe,
    ListPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MatMomentDateModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [
    TranslationService,
    ListService,
    TranslatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

function initializeData() {
  const keys: string[] = ['translations', 'list', 'genres', 'categories'];
  let storage = 'offline';

  if (typeof window !== 'undefined' && ('localStorage' in window) && (localStorage !== undefined) && (localStorage !== null)) {
    storage = 'localStorage';
  }

  Storage.setStorage(storage);

  keys.forEach((next: string) => {
    Storage.getItem(next).subscribe((data: any) => {
      if (data !== null) {
        return;
      }

      Storage.setItem(next, require(`src/assets/fixture/${next}.json`));
    });
  });
}

initializeData();
