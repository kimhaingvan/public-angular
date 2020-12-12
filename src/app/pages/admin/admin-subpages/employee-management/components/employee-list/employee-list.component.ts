import { EmployeeService } from '../../../../../../states/employee-store/employee.service';
import { EmployeeStore } from '../../../../../../states/employee-store/employee.store';
import { EmployeeQuery } from '../../../../../../states/employee-store/employee.query';
import { Router } from '@angular/router';
import { PaginationOpt } from '../../../../../../shared/page-pagination/page-pagination.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employee_list$ = this.employeeQuery.employee_list_view$;
  current_pagination_opt$ = this.employeeQuery.current_pagination_opt$;
  current_page$ = this.employeeQuery.current_page$;
  currentPaginationOpt = new PaginationOpt();

  constructor(
    private router: Router,
    private ref: ChangeDetectorRef,
    private employeeQuery: EmployeeQuery,
    private employeeStore: EmployeeStore,
    private employeeService: EmployeeService) { }

  async ngOnInit() {
    await this.onRequestNewPage();
  }

  async onRequestNewPage() {
    await this.employeeService.GetEmployees(this.employeeQuery.getValue().filter_page).then(() => {
      this.employeeService.setupPagination();
    })
  }

  async navigate(direction) {
    this.employeeService.navigate(direction);
    await this.onRequestNewPage()
  }

  onViewEmployeeDetail(employee_id) {
    this.router.navigateByUrl(`/admin/employee-management/employee-detail/${employee_id}`);
  }
}
