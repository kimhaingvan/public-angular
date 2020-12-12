import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-borrow-ticket-management',
  templateUrl: './borrow-ticket-management.component.html',
  styleUrls: ['./borrow-ticket-management.component.scss']
})
export class BorrowTicketManagementComponent implements OnInit {
  headerItems = [
    {
      itemName: "Danh sách phiếu mượn",
      url: "borrow-ticket-list"
    },
    {
      itemName :"Tạo mới",
      url: "create-borrow-ticket"
    },
  ]

  constructor() { }

  ngOnInit() {
  }
}
