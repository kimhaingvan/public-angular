import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AccountService } from 'src/app/states/account-store/account.service';
import { UtilService } from './../../../services/util.service';
import { ModalController } from './../../../core/modal-controller/modal-controller.service';
import { ModalAction } from './../../../core/modal-controller/modal-action.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss']
})
export class ForgotPasswordModalComponent implements OnInit {
  @Input() role: String = "customer" || "employee";
  loading = false;
  usingEmail = true;
  formForgot = {email:'', phone:''};
  constructor(
    private modalDismiss: ModalAction,
    private modalController:ModalController,
    private util: UtilService,
    private accountService: AccountService,
    private fb: FormBuilder
  ) {
  }

  test() {
  }
  ngOnInit() {
  }

  async doForgotPassword() {
    let email = this.formForgot.email;
    let phone = this.formForgot.phone;
    if(this.usingEmail && !email) {
      return toastr.error('Vui lòng nhập email!');
    }
    if(!this.usingEmail && !phone) {
      return toastr.error('Vui lòng nhập số điện thoại!');
    }
    this.loading = true;
    try {
      this.usingEmail ? phone = '' : email = '';
      if (email && !this.util.validEmail(email)) {
        throw new Error('Địa chỉ email không hợp lệ.');
      }

      const data = {
        email,
        phone
      };
      if(this.role == "customer") {
        let res = await this.accountService.SendResetPasswordEmailCustomer({email:data.email});
      }
      if(this.role == "employee") {
        let res = await this.accountService.SendResetPasswordEmailEmployee({email:data.email});

      }
      if(this.usingEmail) {
        toastr.success(
          'Một email với các chỉ dẫn đặt lại mật khẩu đã được gửi tới địa chỉ email của bạn.');
      } else {
        toastr.success(
          'Một mã xác thực đã được gửi tới số điện thoại của bạn.');
      }
      this.modalDismiss.dismiss(this);
    } catch (e) {
      toastr.error(e.message, 'Yêu cầu mật khẩu mới thất bại!');
    }
    this.loading = false;
  }

  numberOnly(event) {
    const num = Number(event.key);
    if (Number.isNaN(num)) {
      event.preventDefault();
      return false;
    }
  }

  onChangeType() {
    this.usingEmail = !this.usingEmail
  }
}
