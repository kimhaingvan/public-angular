import { AccountQuery } from './../../../../../../../states/account-store/account.query';
import { ModalAction } from './../../../../../../../core/modal-controller/modal-action.service';
import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from 'src/app/states/account-store/account.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss']
})
export class ChangePasswordModalComponent implements OnInit {
  @Input() account_id;
  loading = false;
  change_password_data = {
    current_password:'',
    new_password:'',
    confirm_new_password: ''
  };
  constructor(
    private modalAction: ModalAction,
    private accountQuery: AccountQuery,
    private accountService: AccountService
  ) { }

  ngOnInit() {
  }

  validate() {
    let change_data = this.change_password_data;
    if (!change_data?.current_password) {
      throw new Error('Vui lòng nhập mật khẩu hiện tại.');
    }

    if (!change_data?.new_password) {
      throw new Error('Vui lòng nhập mật khẩu mới.');
    }

    if (change_data?.new_password != change_data?.confirm_new_password) {
      throw new Error('Mật khẩu nhập lại không chính xác.');
    }
  }

  async ChangePassword() {
    let change_data = this.change_password_data;
    try {
      this.validate();
    } catch (e) {
      return toastr.error("Thay đổi mật khẩu thất bại", e.msg || e.message);
    }
    this.loading = true;
    try {
      let data_req = {
        account_id: this.account_id,
        current_password:  change_data.current_password,
        new_password: change_data.new_password
      };
      await this.accountService.ChangePassword(data_req);
      toastr.success('Thay đổi mật khẩu thành công!');
      this.modalAction.dismiss(null);
    } catch (e) {
      toastr.error('Thay đổi mật khẩu không thành công!', e.message || e.msg);
    }

    this.loading = false;
  }

  dismissModal() {
    this.modalAction.dismiss(null);
  }
}
