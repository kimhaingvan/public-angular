import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-schedule-management',
  templateUrl: './schedule-management.component.html',
  styleUrls: ['./schedule-management.component.scss']
})
export class ScheduleManagementComponent implements OnInit {
  headerItems = [
    {
      itemName: "Danh sách ca làm",
      url: "schedule-list"
    },
    {
      itemName: "Lập lịch",
      url: "create-schedule"
    },
  ]

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
