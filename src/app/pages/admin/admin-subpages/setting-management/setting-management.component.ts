import { ChangePasswordModalComponent } from './../account-management/components/account-detail/change-password-modal/change-password-modal.component';
import { ModalController } from './../../../../core/modal-controller/modal-controller.service';
import { account } from './../../../../models/app-models';
import { AccountQuery } from './../../../../states/account-store/account.query';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-management',
  templateUrl: './setting-management.component.html',
  styleUrls: ['./setting-management.component.scss']
})
export class SettingManagementComponent implements OnInit {
  constructor(
  ) { }
  
  ngOnInit() {

  }
}
