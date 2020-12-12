import { MaterialModule } from 'src/app/shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputComponent } from './mat-input.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [MatInputComponent],
  exports: [
    MatInputComponent
  ]
})
export class MatInputModule { }
