import { standardizedId, VND } from './common.pipe';
import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
@Injectable({providedIn:"root"})
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [standardizedId, VND],
  exports: [
    standardizedId,
    VND
  ]
})
export class PipeModule { }
