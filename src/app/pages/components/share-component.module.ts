import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordModalComponent } from './forgot-password-modal/forgot-password-modal.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessageBoxComponent } from './message-box/message-box.component';
import {DashboardBoxComponent} from "./dashboard-box/dashboard-box.component";
@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule

    ],
    declarations: [
        ForgotPasswordModalComponent,
        MessageBoxComponent,
        DashboardBoxComponent,
        ResetPasswordComponent,
    ],
    exports: [
        ForgotPasswordModalComponent,
        ResetPasswordComponent,
        DashboardBoxComponent,
        MessageBoxComponent
    ],
  })
  export class ShareComponentModule { }
