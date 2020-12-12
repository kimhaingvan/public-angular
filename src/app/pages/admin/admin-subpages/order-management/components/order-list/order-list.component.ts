import { Router } from '@angular/router';
import { PaginationOpt, NavigationDirection } from '../../../../../../shared/page-pagination/page-pagination.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrderService } from 'src/app/states/order-store/order.service';
import { OrderQuery } from 'src/app/states/order-store/order.query';
import { OrderStore } from 'src/app/states/order-store/order.store';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  order_list$ = this.OrderQuery.order_list_view$;
  current_pagination_opt$ = this.OrderQuery.current_pagination_opt$;
  current_page$ = this.OrderQuery.current_page$;
  currentPaginationOpt = new PaginationOpt();

  constructor(private router: Router, private OrderService: OrderService, private OrderQuery: OrderQuery, private OrderStore: OrderStore, private ref: ChangeDetectorRef) { }

  async ngOnInit() {
    await this.onRequestNewPage();
  }

  async onRequestNewPage() {
    await this.OrderService.getOrders(this.OrderQuery.getValue().filter_page).then(() => {
      this.OrderService.setupPagination();
    })
  }

  async navigate(direction) {
    this.OrderService.navigate(direction);
    await this.onRequestNewPage()
  }

  onViewOrderDetail(order_id) {
    this.router.navigateByUrl(`/admin/order-management/order-detail/${order_id}`);
  }
}
