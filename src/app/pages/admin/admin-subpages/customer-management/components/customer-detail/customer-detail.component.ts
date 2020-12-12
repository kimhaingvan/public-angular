import { account } from './../../../../../../models/app-models';
import { DatePipe } from '@angular/common';
import { CustomerStore } from './../../../../../../states/customer-store/customer.store';
import { ModalController } from './../../../../../../core/modal-controller/modal-controller.service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from './../../../../../../states/customer-store/customer.service';
import { CustomerQuery } from './../../../../../../states/customer-store/customer.query';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ConfirmDeleteCustomerComponent } from './confirm-delete-customer/confirm-delete-customer.component';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
  providers: [ DatePipe ]
})
export class CustomerDetailComponent implements OnInit {
  filter = {
    page : 1,
    per_page: 1000
  }

  isEditing = false;
  detail_customer$ = this.customerQuery.detail_customer$;

  constructor(
    private customerQuery: CustomerQuery,
    private customerService: CustomerService,
    private router: Router,
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private customerStore: CustomerStore,
    private datePipe: DatePipe) { }

    updateCustomerForm = this.fb.group({
      customer_id: [''],
      customer_name: [''],
      identity_id:[''],
      student_code: [''],
      last_name: [''],
      first_name: [''],
      email: [''],
      phone: [''],
      birth_date: [''],
      address: [''],
      gender: [''],
      note: [''],
    });

  async ngOnInit() {
    const customer_id = {
      customer_id: parseInt(this.route.snapshot.params['id'])
    }
    const res = await this.customerService.SearchCustomers(customer_id);
    const detail_customer = res[0];
    this.customerService.SetDetailCustomer(detail_customer);
    await this.SetupData()
  }

  async ngOnChanges() {
  }

  async SetupData() {
    await this.customerService.SearchOrdersByCustomerId({customer_id: this.customerQuery.getValue().detail_customer.customer_id})
  }

  async onClickUpdateBtn() {
    if(this.isEditing) {
      let update_customer = this.updateCustomerForm.value;
      await this.customerService.UpdateCustomer(update_customer)
    } else {
      this.toggleEdit();
      this.setupDataForm();
    }
  }
    
  goBack() {
    if(this.isEditing) {
      this.toggleEdit()
    } else {
      this.router.navigateByUrl('admin/customer-management/customer-list')
    }
  }  

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  onOpenDeleteModal() {
    const modal = this.modalController.create({
      component: ConfirmDeleteCustomerComponent,
      componentProps: {
        customer: this.customerQuery.getValue().detail_customer
      },
    });
    modal.show().then();
    modal.onDismiss().then(delete_customer => {
      if(delete_customer) {
        try {
          this.customerService.DeleteCustomerById(delete_customer.customer_id)
          this.router.navigateByUrl('admin/customer-management/customer-list')
          toastr.success("Bạn đã xóa khách hàng thành công")
        } catch(e) {
          toastr.error("Xóa khách hàng không thành thông", e.msg || e.message)
        }
      }
    });
  }

  setupDataForm() {
    let store_detail_customer = this.customerQuery.getValue().detail_customer; 
    this.updateCustomerForm.patchValue({
      'first_name' :store_detail_customer?.first_name,
      'last_name' :store_detail_customer?.last_name,
      'customer_id': store_detail_customer?.customer_id,
      'customer_name': store_detail_customer?.last_name + ' '+store_detail_customer?.first_name,
      'email': store_detail_customer?.email,
      'address': store_detail_customer?.address,
      'identity_id': store_detail_customer?.identity_id,
      'phone': store_detail_customer?.phone,
      'gender': store_detail_customer?.gender,
      'birth_date':this.datePipe.transform(store_detail_customer?.birth_day, 'yyyy-MM-dd'),
      'note': store_detail_customer?.note,
      
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
    //       await this.customerService.CreateSupplier(supplier);
    //       await this.customerService.GetSuppliers(this.filter);
    //       toastr.success("Thêm mới nhà cung cấp thành công.")
    //     } catch(e) {
    //       toastr.error("Thêm mới nhà cung cấp thất bại.", e.msg || e.message)
    //     }
    //   }
    // });
  }
  
  get customer_detail_in_store() {
    return this.customerQuery.getValue().detail_customer.supplier.supplier_id
  }
  async UpdateCustomer() {
    let update_customer = this.updateCustomerForm.value;
    let update_req = {
      ...update_customer,
      account_id: this.customerStore.getValue().detail_customer.account.account_id,
      gender: update_customer.gender == 'true' ? true : false,
    };
    try{
      let updated_customer = await this.customerService.UpdateCustomer(update_req) 
      this.customerStore.update({detail_customer: updated_customer})
      toastr.success("Cập nhật sách thành công.")
      this.router.navigateByUrl('admin/customer-management/customer-list')
    } catch(e) {
      toastr.error("Cập nhật sách thất bại.", e.msg || e.message)
    }
  }

}
