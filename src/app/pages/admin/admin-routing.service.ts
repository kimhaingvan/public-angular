import { ManagementDashboardComponent } from './admin-subpages/dashboard/components/management-dashboard/management-dashboard.component';
import { MessageManagementComponent } from './admin-subpages/message-management/message-management.component';
import { BorrowTicketDetailComponent } from './admin-subpages/borrow-ticket-management/components/borrow-ticket-detail/borrow-ticket-detail.component';
import { BorrowTicketListComponent } from './admin-subpages/borrow-ticket-management/components/borrow-ticket-list/borrow-ticket-list.component';
import { UpdateUserModalComponent } from './admin-subpages/setting-management/user-info/update-user-modal/update-user-modal.component';
import { AccountInfoComponent } from './admin-subpages/setting-management/account-info/account-info.component';
import { UserInfoComponent } from './admin-subpages/setting-management/user-info/user-info.component';
import { SettingManagementComponent } from './admin-subpages/setting-management/setting-management.component';
import { ChangePasswordModalComponent } from './admin-subpages/account-management/components/account-detail/change-password-modal/change-password-modal.component';
import { CreateAccountComponent } from './admin-subpages/account-management/components/create-account/create-account.component';
import { AccountDetailComponent } from './admin-subpages/account-management/components/account-detail/account-detail.component';
import { AccountRowComponent } from './admin-subpages/account-management/components/account-list/account-row/account-row.component';
import { AccountListComponent } from './admin-subpages/account-management/components/account-list/account-list.component';
import { AccountManagementComponent } from './admin-subpages/account-management/account-management.component';
import { CreateSupplierComponent } from './admin-subpages/supplier-management/components/create-supplier/create-supplier.component';
import { SupplierRowComponent } from './admin-subpages/supplier-management/components/supplier-list/supplier-row/supplier-row.component';
import { SupplierListComponent } from './admin-subpages/supplier-management/components/supplier-list/supplier-list.component';
import { EmployeeDetailComponent } from './admin-subpages/employee-management/components/employee-detail/employee-detail.component';
import { EmployeeListComponent } from './admin-subpages/employee-management/components/employee-list/employee-list.component';
import { ConfirmDeleteCustomerComponent } from './admin-subpages/customer-management/components/customer-detail/confirm-delete-customer/confirm-delete-customer.component';
import { CustomerDetailComponent } from './admin-subpages/customer-management/components/customer-detail/customer-detail.component';
import { CustomerManagementComponent } from './admin-subpages/customer-management/customer-management.component';
import { ConfirmDeleteModalComponent } from './admin-subpages/book-management/components/book-detail/confirm-delete-modal/confirm-delete-modal.component';
import { PipeModule } from 'src/app/pipes/pipe/pipe.module';
import { BookDetailComponent } from './admin-subpages/book-management/components/book-detail/book-detail.component';
import { PaginationModule } from './../../shared/page-pagination/page-pagination.module';
import { MatInputModule } from './../../shared/mat-input/mat-input.module';
import { BookListComponent } from './admin-subpages/book-management/components/book-list/book-list.component';
import { MaterialModule } from './../../shared/material.module';
import { FormsModule } from '@angular/forms';
import { CreateBookComponent } from './admin-subpages/book-management/components/create-book/create-book.component';
import { BookManagementComponent } from './admin-subpages/book-management/book-management.component';
import { LoginComponent } from './admin-subpages/login/login.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ItemTableModule } from '../components/item-table/item-table.module';
import { BookRowComponent } from './admin-subpages/book-management/components/book-list/book-row/book-row.component';
import { AddAuthorModalComponent } from './admin-subpages/book-management/components/add-author-modal/add-author-modal.component';
import { AddCategoryModalComponent } from './admin-subpages/book-management/components/add-category-modal/add-category-modal.component';
import { AddSupplierModalComponent } from './admin-subpages/book-management/components/add-supplier-modal/add-supplier-modal.component';
import { CustomerListComponent } from './admin-subpages/customer-management/components/customer-list/customer-list.component';
import { CustomerRowComponent } from './admin-subpages/customer-management/components/customer-list/customer-row/customer-row.component';
import { EmployeeManagementComponent } from './admin-subpages/employee-management/employee-management.component';
import { EmployeeRowComponent } from './admin-subpages/employee-management/components/employee-list/employee-row/employee-row.component';
import { ConfirmDeleteEmployeeComponent } from './admin-subpages/employee-management/components/employee-detail/confirm-delete-employee/confirm-delete-employee.component';
import { SupplierManagementComponent } from './admin-subpages/supplier-management/supplier-management.component';
import { SupplierDetailComponent } from './admin-subpages/supplier-management/components/supplier-detail/supplier-detail.component';
import { BorrowTicketManagementComponent } from './admin-subpages/borrow-ticket-management/borrow-ticket-management.component';
import { BorrowTicketRowComponent } from './admin-subpages/borrow-ticket-management/components/borrow-ticket-list/borrow-ticket-row/borrow-ticket-row.component';
import { ConfirmFinishBorrowTicketModalComponent } from './admin-subpages/borrow-ticket-management/components/borrow-ticket-list/confirm-finish-borrow-ticket-modal/confirm-finish-borrow-ticket-modal.component';
import { CreateBorrowTicketComponent } from './admin-subpages/borrow-ticket-management/components/create-borrow-ticket/create-borrow-ticket.component';
import { POSComponent } from './admin-subpages/POS/POS.component';
import { OrderManagementComponent } from './admin-subpages/order-management/order-management.component';
import { OrderListComponent } from './admin-subpages/order-management/components/order-list/order-list.component';
import { OrderDetailComponent } from './admin-subpages/order-management/components/order-detail/order-detail.component';
import { OrderRowComponent } from './admin-subpages/order-management/components/order-list/order-row/order-row.component';
import { CustomerMessagesComponent } from './admin-subpages/message-management/components/customer-messages/customer-messages.component';
import { EmployeeMessagesComponent } from './admin-subpages/message-management/components/employee-messages/employee-messages.component';
import {DashboardComponent} from "./admin-subpages/dashboard/dashboard.component";
import { SellDashboardComponent } from './admin-subpages/dashboard/components/sell-dashboard/sell-dashboard.component';
import {ShareComponentModule} from "../components/share-component.module";
import {ScheduleManagementComponent} from "./admin-subpages/schedule-management/schedule-management.component";

const routes: Routes = [
    { path: '', component: AdminComponent, children: [
        { path: 'book-management', component: BookManagementComponent, children:[
            { path: 'create-book', component: CreateBookComponent},
            { path: 'book-list', component: BookListComponent},
            { path: 'book-detail/:id', component: BookDetailComponent},
            { path: '', redirectTo: 'book-list',pathMatch: 'full'},
            { path: '**', redirectTo: 'book-list' },
        ]},
        { path: 'customer-management', component: CustomerManagementComponent, children:[
            { path: 'customer-list', component: CustomerListComponent},
            { path: 'customer-detail/:id', component: CustomerDetailComponent},
            { path: '', redirectTo: 'customer-list',pathMatch: 'full'},
            { path: '**', redirectTo: 'customer-list' },
        ]},
        { path: 'employee-management', component: EmployeeManagementComponent, children:[
            { path: 'employee-list', component: EmployeeListComponent},
            { path: 'employee-detail/:id', component: EmployeeDetailComponent},
            { path: '', redirectTo: 'employee-list',pathMatch: 'full'},
            { path: '**', redirectTo: 'employee-list' },
        ]},
        { path: 'account-management', component: AccountManagementComponent, children:[
            { path: 'account-list', component: AccountListComponent},
            { path: 'account-detail/:id', component: AccountDetailComponent},
            { path: 'create-account', component: CreateAccountComponent},
            { path: '', redirectTo: 'account-list',pathMatch: 'full'},
            { path: '**', redirectTo: 'account-list' },
        ]},
        { path: 'supplier-management', component: SupplierManagementComponent, children:[
            { path: 'create-supplier', component: CreateSupplierComponent},
            { path: 'supplier-list', component: SupplierListComponent},
            { path: 'supplier-detail/:id', component: SupplierDetailComponent},
            { path: '', redirectTo: 'supplier-list',pathMatch: 'full'},
            { path: '**', redirectTo: 'supplier-list' },
        ]},
        { path: 'settings', component: SettingManagementComponent, children:[
            { path: 'user-info', component: UserInfoComponent},
            { path: 'account-info', component: AccountInfoComponent},
            // { path: 'supplier-list', component: SupplierListComponent},
            // { path: 'supplier-detail/:id', component: SupplierDetailComponent},
            { path: '', redirectTo: 'user-info',pathMatch: 'full'},
            { path: '**', redirectTo: 'user-info' },
        ]},
        { path: 'borrow-ticket-management', component: BorrowTicketManagementComponent, children:[
            { path: 'create-borrow-ticket', component: CreateBorrowTicketComponent},
            { path: 'borrow-ticket-list', component: BorrowTicketListComponent},
            { path: 'borrow-ticket-detail/:id', component: BorrowTicketDetailComponent},
            { path: '', redirectTo: 'borrow-ticket-list',pathMatch: 'full'},
            { path: '**', redirectTo: 'borrow-ticket-list' },
        ]},
        { path: 'pos-management', component: POSComponent, children:[
          ]},
        { path: 'order-management', component: OrderManagementComponent, children:[
            { path: 'order-list', component: OrderListComponent},
            { path: 'order-detail/:id', component: OrderDetailComponent},
            { path: '', redirectTo: 'order-list',pathMatch: 'full'},
            { path: '**', redirectTo: 'order-list' },
          ]},
        { path: 'message-management', component: MessageManagementComponent, children:[
            { path: 'customer-messages', component: CustomerMessagesComponent},
            { path: 'employee-messages', component: EmployeeMessagesComponent},
            { path: '', redirectTo: 'customer-messages',pathMatch: 'full'},
            { path: '**', redirectTo: 'customer-messages' },
         ]},
        { path: 'dashboard', component: DashboardComponent, children:[
            { path: 'sell-dashboard', component: SellDashboardComponent},
            { path: 'management-dashboard', component: ManagementDashboardComponent},
            { path: '', redirectTo: 'sell-dashboard',pathMatch: 'full'},
            { path: '**', redirectTo: 'sell-dashboard' },
          ]},
        { path: 'schedule-management', component: ScheduleManagementComponent, children:[
            // { path: 'schedule-list', component: CustomerMessagesComponent},
            // { path: 'employee-messages', component: EmployeeMessagesComponent},
            { path: '', redirectTo: 'schedule-list',pathMatch: 'full'},
            { path: '**', redirectTo: 'schedule-list' },
          ]},
        { path: '', redirectTo: 'book-management',pathMatch: 'full'},
        { path: '**', redirectTo: 'book-management' },
    ]
    }
];
@NgModule({
    imports: [ShareComponentModule, CommonModule, RouterModule.forChild(routes), FormsModule, MaterialModule, ItemTableModule,MatInputModule, PaginationModule, PipeModule],
    exports: [RouterModule, CreateBookComponent, AddSupplierModalComponent, AddAuthorModalComponent, AddCategoryModalComponent],
    declarations: [LoginComponent, CreateBookComponent, AddSupplierModalComponent, AddCategoryModalComponent, BookListComponent, BookRowComponent, BookDetailComponent, ConfirmDeleteModalComponent, AddAuthorModalComponent, CustomerListComponent, CustomerManagementComponent, CustomerRowComponent, CustomerDetailComponent, ConfirmDeleteCustomerComponent, EmployeeManagementComponent, EmployeeListComponent, EmployeeRowComponent, EmployeeDetailComponent, ConfirmDeleteEmployeeComponent, SupplierListComponent, SupplierRowComponent,SupplierManagementComponent, SupplierDetailComponent, CreateSupplierComponent, AccountManagementComponent, AccountListComponent, AccountRowComponent, AccountDetailComponent, CreateAccountComponent, ChangePasswordModalComponent, SettingManagementComponent, UserInfoComponent, AccountInfoComponent, UpdateUserModalComponent, BorrowTicketManagementComponent, BorrowTicketListComponent, BorrowTicketRowComponent, ConfirmFinishBorrowTicketModalComponent, ConfirmFinishBorrowTicketModalComponent, BorrowTicketDetailComponent, CreateBorrowTicketComponent, POSComponent, OrderListComponent, OrderDetailComponent, OrderRowComponent, OrderManagementComponent, MessageManagementComponent, CustomerMessagesComponent, EmployeeMessagesComponent, DashboardComponent, SellDashboardComponent, ManagementDashboardComponent, ConfirmDeleteModalComponent     ],
    providers:[
        DatePipe,
    ]
})
export class AdminRoutingModule { }
