import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenuComponent } from './sidebar-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule 
  ],
  declarations: [SidebarMenuComponent],
  exports:[
    SidebarMenuComponent
  ]
})
export class SidebarMenuModule { }
