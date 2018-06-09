import { NgModule } from '@angular/core';
import { RouterModule as RModule, Routes } from '@angular/router';

import {
  PageNotFoundComponent,
  ListPageComponent,
  DetailComponent
} from 'src/app/components';

const appRoutes: Routes = [
  {path: 'list', component: ListPageComponent},
  {path: 'detail/:id', component: DetailComponent},
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RModule.forRoot(appRoutes)
  ],
  exports: [RModule]
})
export class RouterModule { }
