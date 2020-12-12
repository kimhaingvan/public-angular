import { AccountService } from './states/account-store/account.service';
import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  loadingPage = false;
  constructor(private accountService: AccountService) {
  }
  ngOnInit() {
  }

}
