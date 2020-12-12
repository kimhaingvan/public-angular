import { ModalAction } from '../../../../../../../core/modal-controller/modal-action.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-employee',
  templateUrl: './confirm-delete-employee.component.html',
  styleUrls: ['./confirm-delete-employee.component.scss']
})
export class ConfirmDeleteEmployeeComponent implements OnInit {
  @Input() employee;
  constructor(private modalAction: ModalAction) { }

  ngOnInit() {
  }

  onConfirmDelete() {
    this.modalAction.dismiss(this.employee)
  }

  dismissModal() {
    this.modalAction.dismiss(null);
  }
}
