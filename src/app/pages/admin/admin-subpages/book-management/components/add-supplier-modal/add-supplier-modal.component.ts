import { ModalAction } from './../../../../../../core/modal-controller/modal-action.service';
import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-add-supplier-modal',
  templateUrl: './add-supplier-modal.component.html',
  styleUrls: ['./add-supplier-modal.component.scss']
})
export class AddSupplierModalComponent implements OnInit {
  supplier = {
    contact_name: '',
    address: '',
    phone: '',
    email: '',
    note: '',
  };
  constructor(
    private modalAction: ModalAction,
    private util: UtilService
  ) { }

  ngOnInit() {
  }

  AddSupplier() {
    if(!this.supplier.contact_name) {
      toastr.error("Vui lòng nhập tên nhà cung cấp")
      return;
    }

    if(!this.supplier.address) {
      toastr.error("Vui lòng nhập địa chỉ")
      return;
    }

    if(!this.util.validatePhoneNumber(this.supplier.phone)) {
      return;
    }
    if(!this.util.validEmail(this.supplier.email)) {
      return;
    }
    this.modalAction.dismiss(this.supplier)
  }

  dismissModal() {
    this.modalAction.dismiss(null);
  }
}
