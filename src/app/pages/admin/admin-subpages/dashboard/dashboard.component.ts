import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../../states/order-store/order.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  headerItems = [
    {
      itemName: "Thư quán",
      url: "sell-dashboard"
    },
    {
      itemName: "Thư viện",
      url: "management-dashboard"
    },
  ]
  constructor(
    private orderService: OrderService
  ) { }

  async ngOnInit() {
    await this.orderService.statistic()
  }

}
