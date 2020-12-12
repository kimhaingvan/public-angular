import { RouterModule } from '@angular/router';
import { MaterialModule } from './../../shared/material.module';
import { BookManagementComponent } from './admin-subpages/book-management/book-management.component';
import { SidebarMenuModule } from './../components/sidebar-menu/sidebar-menu.module';
import { AdminRoutingModule } from './admin-routing.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SendEmailModalComponent } from './admin-subpages/borrow-ticket-management/components/borrow-ticket-detail/send-email-modal/send-email-modal.component';
import { ScheduleManagementComponent } from './admin-subpages/schedule-management/schedule-management.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    MaterialModule,
    SidebarMenuModule
  ],
  declarations: [AdminComponent, BookManagementComponent, SendEmailModalComponent, ScheduleManagementComponent],
  exports: [BookManagementComponent]
})
export class AdminModule { }
