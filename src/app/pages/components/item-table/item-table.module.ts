import { ItemTableComponent } from './item-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ItemTableComponent],
  exports:[
    ItemTableComponent
  ]
})
export class ItemTableModule { }
