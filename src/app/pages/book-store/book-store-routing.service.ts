import { BookStoreComponent } from './book-store.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', component: BookStoreComponent}
];
@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class BookStoreRoutingModule { }
