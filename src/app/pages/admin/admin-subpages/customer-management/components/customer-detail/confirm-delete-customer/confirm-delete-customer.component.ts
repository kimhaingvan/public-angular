import { ModalAction } from './../../../../../../../core/modal-controller/modal-action.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-customer',
  templateUrl: './confirm-delete-customer.component.html',
  styleUrls: ['./confirm-delete-customer.component.scss']
})
export class ConfirmDeleteCustomerComponent implements OnInit {
  @Input() customer;
  constructor(private modalAction: ModalAction) { }

  ngOnInit() {
  }

  onConfirmDelete() {
    this.modalAction.dismiss(this.customer)
  }

  dismissModal() {
    this.modalAction.dismiss(null);
  }
}
