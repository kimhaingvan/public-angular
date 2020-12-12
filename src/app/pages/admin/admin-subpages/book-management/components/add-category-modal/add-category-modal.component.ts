import { ModalAction } from './../../../../../../core/modal-controller/modal-action.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.scss']
})
export class AddCategoryModalComponent implements OnInit {
  category = {
    category_name: '',
    description: '',
  };
  constructor(
    private modalAction: ModalAction
  ) { }

  ngOnInit() {
  }

  AddCategory() {
    this.modalAction.dismiss(this.category)
  }

  dismissModal() {
    this.modalAction.dismiss(null);
  }
}
