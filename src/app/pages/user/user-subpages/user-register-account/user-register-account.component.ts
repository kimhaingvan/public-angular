import { UtilService } from './../../../../services/util.service';
import { Router } from '@angular/router';
import { AccountService } from './../../../../states/account-store/account.service';
import { CustomerStore } from './../../../../states/customer-store/customer.store';
import { CustomerService } from './../../../../states/customer-store/customer.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-register-account',
  templateUrl: './user-register-account.component.html',
  styleUrls: ['./user-register-account.component.scss']
})
export class UserRegisterAccountComponent implements OnInit {
  loading = false;
  userRegisterForm = this.fb.group({
    userName: [''],
    password: [''],
    confirmPassword: [''],
    firstName: 
    '',
    lastName: '',
    identityId: '',
    email:'',
    phone: '',
    birthDate: '',
    address: '',
    gender: '',
  })

  @ViewChild('passwordInput', {static: false}) passwordInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private customerStore: CustomerStore,
    private accountService: AccountService,
    private router: Router,
    private util: UtilService
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

  async CreateCustomerAndAccount() {
    try {
      let form_data = this.userRegisterForm.value

      if(form_data.password != form_data.confirmPassword) {
        return toastr.error("Tạo mới tài khoản thất bại", "Mật khẩu nhập lại không chính xác")
      }
      
      if(!form_data.identityId) {
        return toastr.error("Tạo mới tài khoản thất bại", "Vui lòng nhập chứng minh nhân dân")
      }

      if(!this.util.validatePhoneNumber(form_data.phone)) {
        return;
      }
      if(!this.util.validEmail(form_data.email)) {
        return;
      }

      const info_req = {
        account_name : form_data.userName,
        role_id: 3,
        account_password: form_data.password,
        identity_id: form_data.identityId,
        last_name: form_data.lastName,
        first_name: form_data.firstName,
        phone: form_data.phone,
        email: form_data.email,
        birth_date: form_data.birthDate,
        address: form_data.address,
        gender: Boolean(form_data.gender),
      }
      
      let resp = await this.accountService.CreateAccountAndCustomer(info_req)
      this.router.navigateByUrl('/user/login')
      toastr.success("Tạo mới tài khoản thành công")
    } catch(e) {
      toastr.error("Tạo mới tài khoản thất bại", e.msg || e.message)
    }
  }
}
