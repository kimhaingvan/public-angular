import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier-management',
  templateUrl: './supplier-management.component.html',
  styleUrls: ['./supplier-management.component.scss']
})
export class SupplierManagementComponent implements OnInit {
  headerItems = [
    {
      itemName: "Danh sách",
      url: "supplier-list"
    },
    {
      itemName :"Tạo mới",
      url: "create-supplier"
    },
  ]
  constructor() { }

  ngOnInit() {
  }

}
