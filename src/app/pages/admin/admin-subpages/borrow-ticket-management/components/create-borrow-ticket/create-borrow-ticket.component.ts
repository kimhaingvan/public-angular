import { Router, NavigationEnd } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { BorrowTicketService } from './../../../../../../states/borrow-ticket-store/borrow-ticket.service';
import { BookQuery } from './../../../../../../states/book-store/book.query';
import { startWith, map, tap } from 'rxjs/operators';
import { BorrowTicket } from './../../../../../../models/req';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { BookService } from './../../../../../../states/book-store/book.service';
import { AccountQuery } from './../../../../../../states/account-store/account.query';
import { AccountStore } from './../../../../../../states/account-store/account.store';
import { CustomerStore } from './../../../../../../states/customer-store/customer.store';
import { CustomerQuery } from './../../../../../../states/customer-store/customer.query';
import { CustomerService } from './../../../../../../states/customer-store/customer.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-create-borrow-ticket',
  templateUrl: './create-borrow-ticket.component.html',
  styleUrls: ['./create-borrow-ticket.component.scss']
})
export class CreateBorrowTicketComponent implements OnInit, OnDestroy {
  all_customers = [];
  customer_control = new FormControl();
  customer_options: string[] = [];
  customer_filtered_options: Observable<string[]>;
  customer_item: any;

  all_books = [];
  book_control = new FormControl();
  book_options: string[] = [];
  book_filtered_options: Observable<string[]>;
  book_item: any;

  borrowTicket: BorrowTicket =  {
    readerId: '',
    books  : [],
  };

  employee_id: string;

  confirm_borrow_ticket: any;
  mySubscription: any;
  constructor(
    private borrowTicketService: BorrowTicketService,
    private bookService: BookService,
    private bookQuery: BookQuery,
    private customerService: CustomerService,
    private customerStore: CustomerStore,
    private customerQuery: CustomerQuery,
    private accountStore: AccountStore,
    private accountQuery: AccountQuery,
    private util: UtilService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  filter = {
    page : 1,
    per_page: 1000
  }

  async ngOnInit() {
    this.employee_id = JSON.parse(localStorage.getItem('auth_info')).user_info.employee_id;

    await this.customerService.GetCustomers(this.filter);
    await this.bookService.getBooks(this.filter);

    this.all_books = this.bookQuery.getValue().book_list_view.items;
    this.all_customers = this.customerQuery.getValue().customer_list_view.items;

    this.all_books.forEach(book => {
      this.book_options.push(book.book_id.toString());
    })
    this.book_filtered_options = this.book_control.valueChanges.pipe(
      startWith(''),
      map(value => this._bookFilter(value)),
      tap(() => {
        if(parseInt(this.book_control.value)){
          this.book_item = this.all_books.find(book => book.book_id == parseInt(this.book_control.value))
        }
      })
    );


    this.all_customers.forEach(customer => {
      this.customer_options.push(customer.customer_id.toString());
    })
    this.customer_filtered_options = this.customer_control.valueChanges.pipe(
      startWith(''),
      map(value => this._customerFilter(value)),
      tap(() => {
        if(parseInt(this.customer_control.value)){
          this.customer_item = this.all_customers.find(customer => customer.customer_id == parseInt(this.customer_control.value))
        }
      })
    );
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  private _customerFilter(value: string): string[] {
    return this.customer_options.filter(customer => customer.toLowerCase().indexOf(value) === 0);
  }

  private _bookFilter(value: string): string[] {
    return this.book_options.filter(book => book.toLowerCase().indexOf(value) === 0);
  }

  ClearCustomer() {
    this.customer_control.setValue("");
    this.customer_item = null;
  }

  AddBookToTicket() {
    const req_book_ids = this.borrowTicket.books.map(book => book.book_id)
    if(req_book_ids.indexOf(this.book_item.book_id) != -1) {
      return toastr.error("Thêm sách vào phiếu mượn không thành công", "Mỗi quyển sách chỉ được mượn với số lượng là 1");
    }
    this.borrowTicket.books.push(this.book_item);
    this.book_control.setValue("");
    this.book_item = null
  }

  RemoveBookFromTicket(book_id) {
    this.borrowTicket.books = this.borrowTicket.books.filter(book => book.book_id != book_id);
  }

  async CreateBorrowTicket() {
    try{
      const req_book_ids = this.borrowTicket.books.map(book => book.book_id)
      let isDuplicateExists = this.util.isDuplicateExists(req_book_ids);
      if(isDuplicateExists) {
        return toastr.error("Tạo phiếu mượn sách không thành công", "Mỗi quyển sách chỉ được mượn với số lượng là 1");
      }

      if(!this.customer_item) {
        return toastr.error("Tạo phiếu mượn sách không thành công", "Vui lòng chọn đọc giả");
      }

      if(!req_book_ids || !req_book_ids.length) {
        return toastr.error("Tạo phiếu mượn sách không thành công", "Vui lòng chọn sách mượn");
      }
      const api_req = {
        customer_id: this.customer_item.customer_id,
        employee_id:  JSON.parse(localStorage.getItem('auth_info')).user_info.employee_id,
        borrow_book_ids: req_book_ids
      }
      const res = await this.borrowTicketService.CreateBorrowTicket(api_req);

      if(res) {
        this.confirm_borrow_ticket = res;
      }
      toastr.success("Tạo phiếu mượn sách thành công");
    } catch(e) {
      toastr.error("Tạo phiếu mượn sách không thành công", e.msg || e.message)
    }
  }

  Confirm() {
    this.router.navigateByUrl('admin/borrow-ticket-management/borrow-ticket-list')
  }

  async DeleteBorrowTicket() {
    await this.borrowTicketService.DeleteBorrowTicketById(this.confirm_borrow_ticket.borrow_ticket_id)
    this.router.navigateByUrl('admin/borrow-ticket-management/create-borrow-ticket')

    this.ngOnInit();
  }
}
