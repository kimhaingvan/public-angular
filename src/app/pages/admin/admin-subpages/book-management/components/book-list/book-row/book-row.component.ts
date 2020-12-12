import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book-row',
  templateUrl: './book-row.component.html',
  styleUrls: ['./book-row.component.scss']
})
export class BookRowComponent implements OnInit {
  @Input() book_item;
  @Input() index;
  constructor() { }

  ngOnInit() {
  }

}
