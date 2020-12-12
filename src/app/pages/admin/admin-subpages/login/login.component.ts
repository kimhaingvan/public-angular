import { ModalAction } from './../../../../core/modal-controller/modal-action.service';
import { ModalController } from './../../../../core/modal-controller/modal-controller.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/states/account-store/account.service';
import { AccountStore } from 'src/app/states/account-store/account.store';
import { ForgotPasswordModalComponent } from 'src/app/pages/components/forgot-password-modal/forgot-password-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  account :any ={};
  loading = false;
 
  login_form = this.fb.group({
    user_name: [''],
    password: [''],
  })
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private accountStore: AccountStore,
    private router: Router,
    private modalController: ModalController,
    private modalAction: ModalAction
  ) { }

  ngOnInit() {
  }

  showPassword() {
    let elementPass = <HTMLInputElement>document.querySelector('#password');
    elementPass.type = 'text';
  }

  hidePassword() {
    let elementPass = <HTMLInputElement>document.querySelector('#password');
    elementPass.type = 'password';
  }
  
  async Login() {
    try{
      let login_form_data = this.login_form.value
      const login_req = {
        user_name: login_form_data.user_name,
        password: login_form_data.password,
      }
      await this.accountService.Login(login_req)
      this.router.navigateByUrl('admin/book-management/book-list')
      toastr.success("Đăng nhập thành công")
    } catch(e) {
      toastr.error("Đăng nhập thất bại", e.msg || e.message)
    }
  }

  OpenForgotPasswordModal() {
    const modal = this.modalController.create({
      component: ForgotPasswordModalComponent,
      cssClass: 'modal-lg',
      componentProps: {
        role:"employee"
      },
    });
    modal.show().then();
    modal.onDismiss().then();
  }
}
