import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss']
})
export class EmployeeManagementComponent implements OnInit {
  headerItems = [
    {
      itemName: "Danh sách",
      url: "employee-list"
    },
  ]
  constructor() { }

  ngOnInit() {
  }

}
