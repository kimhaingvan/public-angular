import { EmployeeService } from './../../../../../../states/employee-store/employee.service';
import { AccountService } from './../../../../../../states/account-store/account.service';
import { Router } from '@angular/router';
import { UtilService } from './../../../../../../services/util.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  createAccountForm = this.fb.group({
    account_name: [''],
    password: [''],
    confirm_password: [''],
    first_name: '',
    last_name: '',
    identity_id: '',
    email:'',
    phone: '',
    birthdate: '',
    address: '',
    gender: '',
    image:'',
    role_id: '',
    note: '',
  })
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private accountService: AccountService,
    private router: Router,
    private util: UtilService,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigateByUrl('admin/account-management/account-list')
  }

  ResetDataForm() {
    this.createAccountForm.patchValue({
      account_name: [''],
      password: [''],
      confirm_password: [''],
      first_name: '',
      last_name: '',
      identity_id: '',
      email:'',
      phone: '',
      birthdate: '',
      address: '',
      gender: '',
      image:'',
      note: '',
    });
  }

  async CreateAccount() {

  }

  async CreateEmployeeAndAccount() {
    try {
      let form_data = this.createAccountForm.value

      if(form_data.password != form_data.confirm_password) {
        return toastr.error("Tạo mới tài khoản thất bại", "Mật khẩu nhập lại không chính xác")
      }

      if(!form_data.identity_id) {
        return toastr.error("Tạo mới tài khoản thất bại", "Vui lòng nhập chứng minh nhân dân")
      }

      if(!this.util.validatePhoneNumber(form_data.phone)) {
        return;
      }
      if(!this.util.validEmail(form_data.email)) {
        return;
      }
      const info_req = {
        role_id: form_data.role_id,
        account_name : form_data.account_name,
        account_password: form_data.password,
        confirm_account_password: form_data.confirm_password,

        identity_id: form_data.identity_id,
        last_name: form_data.last_name,
        first_name: form_data.first_name,
        phone: form_data.phone,
        email: form_data.email,
        birth_date: form_data.birthdate,
        address: form_data.address,
        gender: Boolean(form_data.gender),
        image:  form_data.image,
      }

      await this.accountService.CreateAccountAndEmployee(info_req);

      this.router.navigateByUrl('/admin/account-management/account-list')
      toastr.success("Tạo mới tài khoản thành công")
    } catch(e) {
      toastr.error("Tạo mới tài khoản thất bại", e.msg || e.message)
    }
  }

  async onChangeLogo(event) {
    try{
      let fd = new FormData();
      fd.append('image', event.target.files[0], event.target.files[0].name)
      let res : any = await this.http.post('http://localhost:5000/admin/book-management/upload-book-image', fd).toPromise();
      this.createAccountForm.patchValue({
        image: res.image
      })
    }
    catch(e){
      toastr.error("Cập nhật ảnh thất bại!", e.msg || e.message)
    }
  }
}
