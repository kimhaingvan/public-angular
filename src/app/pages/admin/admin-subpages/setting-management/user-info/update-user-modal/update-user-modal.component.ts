import { AccountStore } from 'src/app/states/account-store/account.store';
import { EmployeeService } from './../../../../../../states/employee-store/employee.service';
import { CustomerService } from './../../../../../../states/customer-store/customer.service';
import { DatePipe } from '@angular/common';
import { auth_info, account } from './../../../../../../models/app-models';
import { AccountQuery } from './../../../../../../states/account-store/account.query';
import { FormBuilder } from '@angular/forms';
import { ModalAction } from 'src/app/core/modal-controller/modal-action.service';
import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../../../../services/http.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-update-user-modal',
  templateUrl: './update-user-modal.component.html',
  styleUrls: ['./update-user-modal.component.scss'],
  providers: [ DatePipe ]
})
export class UpdateUserModalComponent implements OnInit {
  update_form = this.fb.group({
    image:'',
    last_name: '',
    first_name: '',
    birth_day: '',
    gender: '',
    address:'',
    note:''
  })

  constructor(
    private modalAction: ModalAction,
    private fb: FormBuilder,
    private accountQuery: AccountQuery,
    private datePipe: DatePipe,
    private customerService: CustomerService,
    private employeeService: EmployeeService,
    private accountStore: AccountStore,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.accountQuery.auth_info$.subscribe(auth_info => {
      const user_info = auth_info.user_info;
      this.update_form.patchValue({
        last_name: user_info.last_name,
        first_name: user_info.first_name,
        birth_day:this.datePipe.transform( user_info?.birth_day, 'yyyy-MM-dd'),
        gender: user_info.gender,
        address:user_info.address,
        note:user_info.note,
        image:user_info.image,
      })
    })
  }

  dismissModal() {
    this.modalAction.dismiss(null);
  }

  async UpdateUser() {
    try {
      const update_form = this.update_form.value;
      const user_info = this.accountQuery.getValue().auth_info.user_info;
      let new_user_info = {};
      if(user_info.account.role.role_id == 1 || user_info.account.role.role_id == 2) { // nếu là employee, admin
        const update_info_req = {
          account_id: user_info.account.account_id,
          employee_id: user_info.employee_id,
          last_name: update_form.last_name,
          first_name: update_form.first_name,
          birth_date: update_form.birth_day,
          gender: update_form.gender,
          address: update_form.address,
          note: update_form.note,
          image: update_form.image,
        }
        new_user_info = await this.employeeService.UpdateEmployee(update_info_req)
        let new_auth_info : auth_info = {
          ...this.accountQuery.getValue().auth_info,
          user_info: new_user_info
        }
        this.accountStore.update({auth_info: new_auth_info})
        localStorage.setItem('auth_info', JSON.stringify(this.accountQuery.getValue().auth_info));
      }

      if(user_info.account.role.role_id == 3) { // nếu là customer
        const update_info_req = {
          account_id: user_info.account.account_id,
          customer_id: user_info.customer_id,
          last_name: update_form.last_name,
          first_name: update_form.first_name,
          birth_date: update_form.birth_day,
          gender: update_form.gender,
          address: update_form.address,
          note: update_form.note,
          image: update_form.image,
        }
        await this.customerService.UpdateCustomer(update_info_req)
      }

      toastr.success("Cập nhật thông tin cá nhân thành công");
      this.modalAction.dismiss(null);
    } catch(e) {
      toastr.error("Cập nhật thông tin cá nhân không thành công", e.msg || e.message)
    }
  }

  async onChangeLogo(event) {
    try{
      let fd = new FormData();
      fd.append('image', event.target.files[0], event.target.files[0].name)
      let res : any = await this.http.post('http://localhost:5000/admin/book-management/upload-book-image', fd).toPromise();
      this.update_form.patchValue({
        image: res.image
      })
    }
    catch(e){
      toastr.error("Cập nhật ảnh thất bại!", e.msg || e.message)
    }
  }
}
