import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-customer-row',
  templateUrl: './customer-row.component.html',
  styleUrls: ['./customer-row.component.scss']
})
export class CustomerRowComponent implements OnInit {
  @Input() customer_item;
  @Input() index;
  constructor() { }

  ngOnInit() {
  }

}
