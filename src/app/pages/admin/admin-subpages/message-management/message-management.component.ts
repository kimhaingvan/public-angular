import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-management',
  templateUrl: './message-management.component.html',
  styleUrls: ['./message-management.component.scss']
})
export class MessageManagementComponent implements OnInit {
  headerItems = [
    {
      itemName: "Khách hàng",
      url: "customer-messages"
    },
    {
      itemName :"Nội bô",
      url: "employee-messages"
    },
  ]
  constructor() { }

  ngOnInit() {
    
  }

}
