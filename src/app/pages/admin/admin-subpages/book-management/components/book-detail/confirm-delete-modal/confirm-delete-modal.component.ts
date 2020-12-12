import { Component, OnInit, Input } from '@angular/core';
import { ModalAction } from 'src/app/core/modal-controller/modal-action.service';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss']
})
export class ConfirmDeleteModalComponent implements OnInit {
  loading = false;
  @Input() book;
  constructor(private modalAction: ModalAction) { }

  ngOnInit() {
  }

  onConfirmDelete() {
    this.modalAction.dismiss(this.book)
  }

  dismissModal() {
    this.modalAction.dismiss(null);
  }
}
