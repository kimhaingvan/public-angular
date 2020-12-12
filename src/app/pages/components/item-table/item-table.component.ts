import { Component, OnInit, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.scss']
})
export class ItemTableComponent implements OnInit {

  @ContentChild('item', { static: true })
  itemTemplate: TemplateRef<any>;

  @ContentChild('emptyItem', { static: true })
  emptyItemTemplate: TemplateRef<any>;

  @ContentChild('header', { static: true })
  headerTemplate: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
