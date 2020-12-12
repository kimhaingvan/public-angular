import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-employee-row',
  templateUrl: './employee-row.component.html',
  styleUrls: ['./employee-row.component.scss']
})
export class EmployeeRowComponent implements OnInit {
  @Input() employee_item;
  @Input() index;
  constructor() { }

  ngOnInit() {
  }

}
