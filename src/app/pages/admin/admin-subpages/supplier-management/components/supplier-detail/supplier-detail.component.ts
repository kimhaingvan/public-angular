import { SupplierStore } from '../../../../../../states/supplier-store/supplier.store';
import { SupplierQuery } from 'src/app/states/supplier-store/supplier.query';
import { ConfirmDeleteModalComponent } from './confirm-delete-modal/confirm-delete-modal.component';
import { ModalController } from '../../../../../../core/modal-controller/modal-controller.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiSupplierService } from '../../../../../../API/api-supplier.service';
import { Component, OnInit, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SupplierService } from 'src/app/states/supplier-store/supplier.service';
@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss']
})
export class SupplierDetailComponent implements OnInit, OnChanges {
  filter = {
    page : 1,
    per_page: 1000
  }

  isEditing = false;
  detail_supplier$ = this.supplierQuery.detail_supplier$;


  constructor(
    private supplierQuery: SupplierQuery,
    private supplierService: SupplierService,
    private router: Router,
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private supplierStore: SupplierStore) { }

    updateSupplierForm = this.fb.group({
      supplier_id: [''],
      contact_name: [''],
      address:[''],
      phone: [''],
      email: [''],
      note: [''],
    });

  async ngOnInit() {
    const supplier_id = {
      supplier_id: parseInt(this.route.snapshot.params['id'])
    }
    const res = await this.supplierService.SearchSuppliers(supplier_id);
    const detail_supplier = res[0];
    this.supplierService.SetDetailSupplier(detail_supplier);
  }

  async ngOnChanges() {
  }

  async onClickUpdateBtn() {
    if(this.isEditing) {
      let update_supplier = this.updateSupplierForm.value;
      await this.supplierService.UpdateSupplier(update_supplier)
    } else {
      this.toggleEdit();
      this.setupDataForm();
    }
  }
    
  goBack() {
    if(this.isEditing) {
      this.toggleEdit()
    } else {
      this.router.navigateByUrl('admin/supplier-management/supplier-list')
    }
  }  

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  onOpenDeleteModal() {
    const modal = this.modalController.create({
      component: ConfirmDeleteModalComponent,
      componentProps: {
        supplier: this.supplierQuery.getValue().detail_supplier
      },
    });
    modal.show().then();
    modal.onDismiss().then(delete_supplier => {
      if(delete_supplier) {
        try {
          this.supplierService.DeleteSupplierById(delete_supplier.supplier_id)
          this.router.navigateByUrl('admin/supplier-management/supplier-list')
          toastr.success("Bạn đã xóa nhà cung cấp thành công")
        } catch(e) {
          toastr.error("Xóa nhà cung cấp không thành thông", e.msg || e.message)
        }
      }
    });
  }

  setupDataForm() {
    let store_detail_supplier = this.supplierQuery.getValue().detail_supplier; 
    this.updateSupplierForm.patchValue({
      'supplier_id': store_detail_supplier?.supplier_id,
      'contact_name': store_detail_supplier?.contact_name,
      'address': store_detail_supplier?.address,
      'phone': store_detail_supplier?.phone,
      'email': store_detail_supplier?.email,
      'note': store_detail_supplier?.note,
    });
  }

  
  get supplier_detail_in_store() {
    return this.supplierQuery.getValue().detail_supplier.supplier.supplier_id
  }

  async UpdateSupplier() {
    let update_supplier = this.updateSupplierForm.value;
    let update_req = {
      ...update_supplier,
    };
    try{
      let updated_supplier = await this.supplierService.UpdateSupplier(update_req) 
      this.supplierStore.update({detail_supplier: updated_supplier})
      toastr.success("Cập nhật nhà cung cấp thành công.")
      this.router.navigateByUrl('admin/supplier-management/supplier-list')
    } catch(e) {
      toastr.error("Cập nhật nhà cung cấp thất bại.", e.msg || e.message)
    }
  }

  get author() {
    return  this.supplierQuery.getValue().detail_supplier.author; 
  }
}
