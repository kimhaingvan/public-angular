import { account } from './../../../../../../models/app-models';
import { ConfirmDeleteAccountComponent } from './confirm-delete-account/confirm-delete-account.component';
import { DatePipe } from '@angular/common';
import { AccountStore } from '../../../../../../states/account-store/account.store';
import { ModalController } from '../../../../../../core/modal-controller/modal-controller.service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../../../../states/account-store/account.service';
import { AccountQuery } from '../../../../../../states/account-store/account.query';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
  providers: [ DatePipe ]
})
export class AccountDetailComponent implements OnInit {
  filter = {
    page : 1,
    per_page: 1000
  }

  isEditing = false;
  detail_account$ = this.accountQuery.detail_account$;

  constructor(
    private accountQuery: AccountQuery,
    private accountService: AccountService,
    private router: Router,
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private accountStore: AccountStore,
    private datePipe: DatePipe) { }

    updateAccountForm = this.fb.group({
      account_id: [''],
      account_name: [''],
      identity_id:[''],
      student_code: [''],
      last_name: [''],
      first_name: [''],
      email: [''],
      phone: [''],
      birth_date: [''],
      address: [''],
      gender: [''],
      note: [''],
    });

  async ngOnInit() {
    const account_id = {
      account_id: parseInt(this.route.snapshot.params['id'])
    }
    const res = await this.accountService.SearchAccounts(account_id);
    const detail_account = res.accounts[0];
    this.accountService.SetDetailAccount(detail_account);
  }

  async ngOnChanges() {
  }

  async onClickUpdateBtn() {
    if(this.isEditing) {
      let update_account = this.updateAccountForm.value;
      await this.accountService.UpdateAccount(update_account)
    } else {
      this.toggleEdit();
      this.setupDataForm();
    }
  }

  goBack() {
    if(this.isEditing) {
      this.toggleEdit()
    } else {
      this.router.navigateByUrl('admin/account-management/account-list')
    }
  }

  ViewToCustomer() {
    this.router.navigateByUrl('admin/customer-management/customer-detail/'+this.accountQuery.getValue().detail_account.customer_id)
  }

  ViewToEmployee() {
    this.router.navigateByUrl('admin/employee-management/employee-detail/'+this.accountQuery.getValue().detail_account.employee_id)
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }


  setupDataForm() {
    let store_detail_account = this.accountQuery.getValue().detail_account;
    this.updateAccountForm.patchValue({
      'first_name' :store_detail_account?.first_name,
      'last_name' :store_detail_account?.last_name,
      'account_id': store_detail_account?.account_id,
      'account_name': store_detail_account?.last_name + ' '+store_detail_account?.first_name,
      'email': store_detail_account?.email,
      'address': store_detail_account?.address,
      'identity_id': store_detail_account?.identity_id,
      'phone': store_detail_account?.phone,
      'gender': store_detail_account?.gender,
      'birth_date':this.datePipe.transform(store_detail_account?.birth_day, 'yyyy-MM-dd'),
      'note': store_detail_account?.note,

    });

  }

  OpenAddSupplierModal() {
    // const modal = this.modalController.create({
    //   component: AddSupplierModalComponent,
    //   cssClass: 'modal-xl',
    //   componentProps: {
    //   },
    // });
    // modal.show().then();
    // modal.onDismiss().then(async supplier =>  {
    //   if(supplier) {
    //     try {
    //       await this.accountService.CreateSupplier(supplier);
    //       await this.accountService.GetSuppliers(this.filter);
    //       toastr.success("Thêm mới nhà cung cấp thành công.")
    //     } catch(e) {
    //       toastr.error("Thêm mới nhà cung cấp thất bại.", e.msg || e.message)
    //     }
    //   }
    // });
  }

  get account_detail_in_store() {
    return this.accountQuery.getValue().detail_account.supplier.supplier_id
  }
  async UpdateAccount() {
    let update_account = this.updateAccountForm.value;
    let update_req = {
      ...update_account,
      account_id: this.accountStore.getValue().detail_account.account.account_id,
      gender: update_account.gender == 'true' ? true : false,
    };
    try{
      let updated_account = await this.accountService.UpdateAccount(update_req)
      this.accountStore.update({detail_account: updated_account})
      toastr.success("Cập nhật sách thành công.")
      this.router.navigateByUrl('admin/account-management/account-list')
    } catch(e) {
      toastr.error("Cập nhật sách thất bại.", e.msg || e.message)
    }
  }

  OpenDeleteModal() {
    const modal = this.modalController.create({
      component: ConfirmDeleteAccountComponent,
      componentProps: {
        account: this.accountQuery.getValue().detail_account.account
      },
    });
    modal.show().then();
    modal.onDismiss().then(async delete_account => {
      if(delete_account) {
        try {
          await this.accountService.DeleteAccountById(delete_account.account_id)
          this.router.navigateByUrl('admin/account-management/account-list')
          toastr.success("Bạn đã xóa tài khoản thành công")
        } catch(e) {
          toastr.error("Xóa tài khoản không thành thông", e.code || e.message)
        }
      }
    });
  }

  OpenChangePasswordModal() {
    const modal = this.modalController.create({
      component: ChangePasswordModalComponent,
      cssClass: "modal-lg",
      componentProps: {
        account_id: this.accountQuery.getValue().detail_account.account.account_id
      },
    });
    modal.show().then();
  }
}
