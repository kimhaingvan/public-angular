import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {
  headerItems = [
    {
      itemName: "Danh sách",
      url: "account-list"
    },
    {
      itemName: "Tạo mới thông tin tài khoản",
      url: "create-account"
    },
  ]
  constructor() { }

  ngOnInit() {
  }

}
