import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagePaginationComponent } from './page-pagination.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [PagePaginationComponent],
  exports: [
    PagePaginationComponent
  ]
})
export class PaginationModule { }
