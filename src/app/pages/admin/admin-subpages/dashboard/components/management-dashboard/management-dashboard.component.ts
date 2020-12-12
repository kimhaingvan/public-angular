import { Component, OnInit } from '@angular/core';
import {OrderQuery} from "../../../../../../states/order-store/order.query";
declare var google: any;

@Component({
  selector: 'app-management-dashboard',
  templateUrl: './management-dashboard.component.html',
  styleUrls: ['./management-dashboard.component.scss']
})
export class ManagementDashboardComponent implements OnInit {
  dashboard$ = this.orderQuery.dashboard$
  constructor(
    private orderQuery: OrderQuery
  ) { }

  ngOnInit() {
  }

}
