import { ConfirmDeleteEmployeeComponent } from './confirm-delete-employee/confirm-delete-employee.component';
import { account } from '../../../../../../models/app-models';
import { DatePipe } from '@angular/common';
import { EmployeeStore } from '../../../../../../states/employee-store/employee.store';
import { ModalController } from '../../../../../../core/modal-controller/modal-controller.service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../../../../states/employee-store/employee.service';
import { EmployeeQuery } from '../../../../../../states/employee-store/employee.query';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
  providers: [ DatePipe ]
})
export class EmployeeDetailComponent implements OnInit {
  filter = {
    page : 1,
    per_page: 1000
  }

  isEditing = false;
  detail_employee$ = this.employeeQuery.detail_employee$;

  constructor(
    private employeeQuery: EmployeeQuery,
    private employeeService: EmployeeService,
    private router: Router,
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private employeeStore: EmployeeStore,
    private datePipe: DatePipe) { }

    updateEmployeeForm = this.fb.group({
      employee_id: [''],
      employee_name: [''],
      identity_id:[''],
      student_code: [''],
      last_name: [''],
      first_name: [''],
      email: [''],
      phone: [''],
      birth_date: [''],
      basic_rate:  [''],
      address: [''],
      gender: [''],
      note: [''],
    });

  async ngOnInit() {
    const employee_id = {
      employee_id: parseInt(this.route.snapshot.params['id'])
    }
    const res = await this.employeeService.SearchEmployees(employee_id);
    const detail_employee = res[0];
    this.employeeService.SetDetailEmployee(detail_employee);
  }

  async ngOnChanges() {
  }


  async onClickUpdateBtn() {
    if(this.isEditing) {
      let update_employee = this.updateEmployeeForm.value;
      await this.employeeService.UpdateEmployee(update_employee)
    } else {
      this.toggleEdit();
      this.setupDataForm();
    }
  }
    
  goBack() {
    if(this.isEditing) {
      this.toggleEdit()
    } else {
      this.router.navigateByUrl('admin/employee-management/employee-list')
    }
  }  

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  onOpenDeleteModal() {
    const modal = this.modalController.create({
      component: ConfirmDeleteEmployeeComponent,
      componentProps: {
        employee: this.employeeQuery.getValue().detail_employee
      },
    });
    modal.show().then();
    modal.onDismiss().then(delete_employee => {
      if(delete_employee) {
        try {
          this.employeeService.DeleteEmployeeById(delete_employee.employee_id)
          this.router.navigateByUrl('admin/employee-management/employee-list')
          toastr.success("Bạn đã xóa nhân viên thành công")
        } catch(e) {
          toastr.error("Xóa nhân viên không thành thông", e.msg || e.message)
        }
      }
    });
  }

  setupDataForm() {
    let store_detail_employee = this.employeeQuery.getValue().detail_employee; 
    this.updateEmployeeForm.patchValue({
      'first_name' :store_detail_employee?.first_name,
      'last_name' :store_detail_employee?.last_name,
      'employee_id': store_detail_employee?.employee_id,
      'employee_name': store_detail_employee?.last_name + ' '+store_detail_employee?.first_name,
      'email': store_detail_employee?.email,
      'address': store_detail_employee?.address,
      'identity_id': store_detail_employee?.identity_id,
      'phone': store_detail_employee?.phone,
      'gender': store_detail_employee?.gender,
      'basic_rate': store_detail_employee?.basic_rate,
      'birth_date':this.datePipe.transform(store_detail_employee?.birth_day, 'yyyy-MM-dd'),
      'note': store_detail_employee?.note,
      
    });

  }

  OpenAddSupplierModal() {
    // const modal = this.modalController.create({
    //   component: AddSupplierModalComponent,
    //   cssClass: 'modal-xl',
    //   componentProps: {
    //   },
    // });
    // modal.show().then();
    // modal.onDismiss().then(async supplier =>  {
    //   if(supplier) {
    //     try {
    //       await this.employeeService.CreateSupplier(supplier);
    //       await this.employeeService.GetSuppliers(this.filter);
    //       toastr.success("Thêm mới nhà cung cấp thành công.")
    //     } catch(e) {
    //       toastr.error("Thêm mới nhà cung cấp thất bại.", e.msg || e.message)
    //     }
    //   }
    // });
  }
  
  get employee_detail_in_store() {
    return this.employeeQuery.getValue().detail_employee.supplier.supplier_id
  }
  async UpdateEmployee() {
    let update_employee = this.updateEmployeeForm.value;
    let update_req = {
      ...update_employee,
      account_id: this.employeeStore.getValue().detail_employee.account.account_id,
      gender: update_employee.gender == 'true' ? true : false,
    };
    try{
      let updated_employee = await this.employeeService.UpdateEmployee(update_req) 
      this.employeeStore.update({detail_employee: updated_employee})
      toastr.success("Cập nhật sách thành công.")
      this.router.navigateByUrl('admin/employee-management/employee-list')
    } catch(e) {
      toastr.error("Cập nhật sách thất bại.", e.msg || e.message)
    }
  }

}
