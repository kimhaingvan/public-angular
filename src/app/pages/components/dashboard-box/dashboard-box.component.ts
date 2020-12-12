import {Component, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-dashboard-box',
  templateUrl: './dashboard-box.component.html',
  styleUrls: ['./dashboard-box.component.scss']
})
export class DashboardBoxComponent implements OnInit {
  @Input() title: string ;
  @ContentChild('content', { static: true })
  content: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
