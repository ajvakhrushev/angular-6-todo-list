import { NgModule } from '@angular/core';
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

const list = [
  MatToolbarModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatSortModule,
  MatIconModule
];

@NgModule({
  imports: list,
  exports: [...list]
})
export class MaterialModule { }
