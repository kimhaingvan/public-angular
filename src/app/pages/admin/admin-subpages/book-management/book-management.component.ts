import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.scss']
})
export class BookManagementComponent implements OnInit {
  headerItems = [
    {
      itemName: "Danh sách",
      url: "book-list"
    },
    {
      itemName :"Tạo mới",
      url: "create-book"
    },
  ]
  constructor() { }

  ngOnInit() {
  }

}
