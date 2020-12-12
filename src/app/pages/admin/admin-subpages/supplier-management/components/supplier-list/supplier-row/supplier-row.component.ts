import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-supplier-row',
  templateUrl: './supplier-row.component.html',
  styleUrls: ['./supplier-row.component.scss']
})
export class SupplierRowComponent implements OnInit {
  @Input() supplier_item;
  @Input() index;
  constructor() { }

  ngOnInit() {
  }

}
