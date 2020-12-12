import { ModalController } from '../../../../../../core/modal-controller/modal-controller.service';
import { SupplierStore } from '../../../../../../states/supplier-store/supplier.store';
import { SupplierService } from 'src/app/states/supplier-store/supplier.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SupplierQuery } from 'src/app/states/supplier-store/supplier.query';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.scss']
})
export class CreateSupplierComponent implements OnInit {
  filter = {
    page : 1,
    per_page : 1000
  }

  createSupplierForm = this.fb.group({
    supplier_id: [''],
      contact_name: [''],
      address:[''],
      phone: [''],
      email: [''],
      note: [''],
  });


  constructor(
    private fb : FormBuilder,
    private router: Router,
    private supplierService: SupplierService,

    ) { }

  async ngOnInit() {
  }
  async onCreateUser() {
    // const newReader = {...this.reader};
    // const res = await this.readerService.createReader(newReader);
    // if(res.success) {
    //   toastr.success("Bạn đã tạo mới đọc giả thành công!", "Đăng ký thành công");
    //   this.router.navigateByUrl('/admin/user-management/user-list');
    // } else {
    //   toastr.error("Vui lòng thực hiện lại thao tác!", "Đăng ký thất bại");
    // }
  }


  ResetDataForm() {
    this.createSupplierForm.patchValue({
      'supplier_id': '',
      'contact_name': '',
      'address': '',
      'phone': '',
      'email': '',
      'note': '',
    });
  }

  async CreateSupplier() {
    let supplier_data = this.createSupplierForm.value;
    if(!supplier_data.contact_name || !supplier_data.address || !supplier_data.phone || !supplier_data.email ) {
      toastr.error("Tạo mới nhà cung cấp thất bại.", "Vui lòng nhập đầy đủ thông tin nhà cung cấp.")
      return;
    }
    try {
      let created_supplier = await this.supplierService.CreateSupplier(supplier_data)
      this.router.navigateByUrl(`/admin/supplier-management/supplier-detail/${created_supplier.supplier_id}`);
      toastr.success("Tạo mới nhà cung cấp thành công.");
    } catch(e) {
      toastr.error("Tạo mới nhà cung cấp thất bại", e.msg || e.message)
    }
  }

  goBack() {
    this.router.navigateByUrl('admin/supplier-management/supplier-list')
  }  

}
