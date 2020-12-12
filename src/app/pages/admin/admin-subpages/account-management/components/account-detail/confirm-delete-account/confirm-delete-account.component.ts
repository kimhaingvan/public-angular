import { ModalAction } from '../../../../../../../core/modal-controller/modal-action.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-account',
  templateUrl: './confirm-delete-account.component.html',
  styleUrls: ['./confirm-delete-account.component.scss']
})
export class ConfirmDeleteAccountComponent implements OnInit {
  @Input() account;
  constructor(private modalAction: ModalAction) { }

  ngOnInit() {
  }

  onConfirmDelete() {
    this.modalAction.dismiss(this.account)
  }

  dismissModal() {
    this.modalAction.dismiss(null);
  }
}
