import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/states/account-store/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  arr = ['21' ,'21' ,'41','121','21'];

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.UploadAccountFromLocalStorageToStore();
  }

}
