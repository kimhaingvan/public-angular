import { CustomerStore } from './../../../../states/customer-store/customer.store';
import { BookStore } from './../../../../states/book-store/book.store';
import { BookService } from './../../../../states/book-store/book.service';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/states/customer-store/customer.service';
import {FormBuilder, FormControl} from '@angular/forms';
import {Observable} from "rxjs";
import {map, startWith, tap} from "rxjs/operators";
import {CustomerQuery} from "../../../../states/customer-store/customer.query";
import {order_line} from "../../../../models/app-models";
import {BookQuery} from "../../../../states/book-store/book.query";
import {ApiOrderService} from "../../../../API/api-order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-POS',
  templateUrl: './POS.component.html',
  styleUrls: ['./POS.component.scss']
})
export class POSComponent implements OnInit {
  //Danh sách các Forms: Gio hàng, khách hàng, hóa đơn, sản phẩm
  order_lines: order_line[] = []
  search_keyword: string;
  books = []
  order = {
    price: 0.0,
    total : 0,
    total_amount: 0,
    discount: 0.0,
    fee: 0.0,
    receipt: 0.0,
    note:'',
    customer_paid_fee: 0.0
  }


  all_customers = [];
  customer_control = new FormControl();
  customer_options: any[] = [];
  customer_filtered_options: Observable<string[]>;
  customer_item: any; // Khách hàng được chọn


  filter = {
    page : 1,
    per_page: 1000
  }

  constructor(
    private bookService: BookService,
    private bookStore: BookStore,
    private bookQuery: BookQuery,
    private customerService: CustomerService,
    private customerQuery: CustomerQuery,
    private fb: FormBuilder,
    private apiOrderService: ApiOrderService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.customerService.GetCustomers(this.filter);
    await this.bookService.getBooks(this.filter)
    this.books= this.bookQuery.getValue().book_list_view.items
    this.all_customers = this.customerQuery.getValue().customer_list_view.items;
    this.all_customers.forEach(customer => {
      let customer_option = {
        customer_id: customer.customer_id,
        last_name: customer.last_name,
        first_name: customer.first_name,
      }
      this.customer_options.push(customer_option);
    })
    this.customer_filtered_options = this.customer_control.valueChanges.pipe(
      startWith(''),
      map(value => this._customerFilter(value)),
      tap(() => {

        if(this.customer_control.value){
          this.customer_item = this.all_customers.find(customer => customer.customer_id == parseInt(this.customer_control.value))
        }
      })
    );
  }

  private _customerFilter(value: string): string[] {
    return this.customer_options.filter(customer =>  customer.first_name.toString().toLowerCase().includes(value)  || customer.last_name.toString().includes(value) || customer.customer_id.toString().toLowerCase().includes(value));
  }

  ClearCustomer() {
    this.customer_control.setValue("");
    this.customer_item = null;
  }

  AddToChart(book) {
    let order_book_ids = this.order_lines.map(order_line => order_line.book_id)
    let existing_order_line = this.order_lines.find(od=> od.book_id == book.book_id);
    if(book.new_amount == 0 || (existing_order_line && existing_order_line.quantity >= book.new_amount) ) {
      return toastr.error('Số lượng tồn kho không hợp lệ!')
    }

    if(order_book_ids.indexOf(book.book_id) != -1) {
      this.order_lines.forEach(orderLine => {
        if(orderLine.book_id == book.book_id) {
          orderLine.quantity += 1
          this.ChangeQuantity(orderLine);
        }
      })
    } else {
      let book_order_line = {
        book_id: book.book_id,
        quantity: 1,
        image: book.image,
        book_name: book.book_name,
        retail_price: book.retail_price,
        total_price: book.retail_price * (1-book.discount),
        new_amount: book.new_amount,
        discount: book.discount
      };
      this.order_lines.push(book_order_line);
      this.SumOrder();
    }

  }

  SumOrder() {
      if(this.order_lines.length == 0) {
        this.order = {
          price: 0.0,
          total : 0,
          total_amount: 0,
          discount: 0.0,
          fee: 0.0,
          receipt: 0.0,
          note:'',
          customer_paid_fee: 0.0
        }
      }
      this.order.price= this.order_lines.reduce((sum, order_line) => sum + order_line.total_price, 0);
      this.order.total_amount= this.order_lines.reduce((sum, order_line) => sum + order_line.quantity, 0);
      this.order.total = this.order.price - this.order.discount + this.order.fee

  }

  RemoveOrderLine(order_line) {
    this.order_lines = this.order_lines.filter(orderLine => orderLine.book_id != order_line.book_id);
    this.SumOrder();
  }

  IncreaseQuantity(order_line) {
    if(order_line.quantity >= order_line.new_amount) {
      return toastr.error('Số lượng hàng tồn kho không đủ!')
    }
    order_line.quantity += 1;
    this.ChangeQuantity(order_line)
    this.SumOrder()
  }

  DecreaseQuantity(order_line) {
    order_line.quantity -= 1;
    this.ChangeQuantity(order_line);
    this.SumOrder()
  }

  ChangeQuantity(order_line) {
    order_line.quantity = order_line.quantity < 0 ? Math.abs(order_line.quantity) : order_line.quantity;
    order_line.total_price = order_line.retail_price * (1 - order_line.discount) * order_line.quantity;
    this.SumOrder();
  }

  async CreateOrder() {
    try {
      const create_order_req = {
        customer_id: this.customer_item.customer_id,
        employee_id: JSON.parse(localStorage.getItem('auth_info')).user_info.employee_id,
        order_date: Date.now(),
        type:'in',
        total: this.order.total,
        note: this.order.note,
        order_detail_list: this.order_lines
      }
      await this.apiOrderService.CreateOrder(create_order_req)
      toastr.success('Thanh toán hóa đơn thành công')
      window.location.href = 'http://localhost:4200/admin/pos-management'

    } catch (e) {
      toastr.error('Thanh toán hóa đơn thất bại')
    }
  }

  SearchBooks() {
      let book_in_store = this.bookQuery.getValue().book_list_view.items;
      this.books = book_in_store.filter(book =>  book.book_name.includes(this.search_keyword) || book.book_id == this.search_keyword)
  }

  async CreateOrderByMomo() {
    try {
      const create_order_req = {
        customer_id: this.customer_item.customer_id,
        employee_id: JSON.parse(localStorage.getItem('auth_info')).user_info.employee_id,
        order_date: Date.now(),
        type:'in',
        total: this.order.total.toFixed(0),
        note: this.order.note,
        order_detail_list: this.order_lines
      }
      let result = await this.apiOrderService.CreateOrderByMoMo(create_order_req)
      if(result.errorCode == 0) {
        toastr.success('Thanh toán hóa đơn bằng MOMO thành công')
        window.location.href = result.payUrl
      }
    } catch (e) {
      toastr.error('Thanh toán hóa đơn bằng MOMO thất bại')
    }
  }
}
