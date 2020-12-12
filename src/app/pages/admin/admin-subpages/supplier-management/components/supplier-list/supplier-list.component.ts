import { async } from '@angular/core/testing';
import { SupplierStore } from '../../../../../../states/supplier-store/supplier.store';
import { SupplierQuery } from '../../../../../../states/supplier-store/supplier.query';
import { SupplierService } from '../../../../../../states/supplier-store/supplier.service';
import { Router } from '@angular/router';
import { PaginationOpt, NavigationDirection } from '../../../../../../shared/page-pagination/page-pagination.component';
import { Subject } from 'rxjs';
import { ApiSupplierService } from '../../../../../../API/api-supplier.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {
  supplier_list$ = this.supplierQuery.supplier_list_view$;
  current_pagination_opt$ = this.supplierQuery.current_pagination_opt$;
  current_page$ = this.supplierQuery.current_page$;
  currentPaginationOpt = new PaginationOpt();

  constructor(private router: Router, private supplierService: SupplierService, private supplierQuery: SupplierQuery, private supplierStore: SupplierStore, private ref: ChangeDetectorRef) { }

  async ngOnInit() {
    await this.onRequestNewPage();
  }

  async onRequestNewPage() {
    await this.supplierService.GetSuppliers(this.supplierQuery.getValue().filter_page).then(() => {
      this.supplierService.setupPagination();
    })
  }

  async navigate(direction) {
    this.supplierService.navigate(direction);
    await this.onRequestNewPage()
  }

  onViewSupplierDetail(supplier_id) {
    this.router.navigateByUrl(`/admin/supplier-management/supplier-detail/${supplier_id}`);
  }
}