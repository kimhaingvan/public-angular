import { ChangePasswordModalComponent } from './../../account-management/components/account-detail/change-password-modal/change-password-modal.component';
import { ModalController } from './../../../../../core/modal-controller/modal-controller.service';
import { AccountQuery } from './../../../../../states/account-store/account.query';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {
  user_info;

  constructor(
    private accountQuery: AccountQuery,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.user_info = this.accountQuery.getValue().auth_info.user_info
  }

  OpenChangePasswordModal() {
    const modal = this.modalController.create({
      component: ChangePasswordModalComponent,
      cssClass: "modal-lg",
      componentProps: {
        account_id: this.user_info.account.account_id
      },
    });
    modal.show().then();
  }

}
