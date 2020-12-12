import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  headerItems = [
    {
      itemName: "Danh sách hóa đơn",
      url: "order-list"
    },
  ]

  constructor(private router: Router) { }

  ngOnInit() {
  }

  GoToPOS() {
    this.router.navigateByUrl('/admin/pos-management')
  }
}
