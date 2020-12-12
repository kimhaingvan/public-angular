import { ShareComponentModule } from './../components/share-component.module';
import { BookStoreRoutingModule } from './book-store-routing.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookStoreComponent } from './book-store.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BookStoreRoutingModule,
    ShareComponentModule,
    FormsModule
  ],
  declarations: [BookStoreComponent]
})
export class BookStoreModule { }
