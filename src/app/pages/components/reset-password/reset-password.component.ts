import { AccountService } from './../../../states/account-store/account.service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  loading = false;
  token: String;
  reset_password_form = this.fb.group({
    password: [''],
    confirm_password: ['']
  })
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.token = data['token']
    })
  }

  async ResetPassword() {
    try{
      const form_data = this.reset_password_form.value
      if(form_data.password != form_data.confirm_password) {
        return toastr.error("Đặt lại mật khẩu mới thất bại", "Mật khẩu nhập lại không chính xác")
      }

      const req = {
        token : this.token,
        password: form_data.password
      }
      await this.accountService.ResetPassword(req)
      this.router.navigateByUrl('/book-store')
      toastr.success('Đặt lại mật khẩu thành công')
    } catch(e) {
      toastr.error("Đặt lại mật khẩu thất bại", e.msg || e.message)
    }


  }

}
