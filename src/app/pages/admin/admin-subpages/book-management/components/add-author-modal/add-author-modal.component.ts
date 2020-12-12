import { ModalAction } from 'src/app/core/modal-controller/modal-action.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-author-modal',
  templateUrl: './add-author-modal.component.html',
  styleUrls: ['./add-author-modal.component.scss']
})
export class AddAuthorModalComponent implements OnInit {
  author = {
    author_name: ''
  };
  constructor(
    private modalAction: ModalAction
  ) { }

  ngOnInit() {
  }

  AddAuthor() {
    this.modalAction.dismiss(this.author)
  }

  dismissModal() {
    this.modalAction.dismiss(null);
  }
}
