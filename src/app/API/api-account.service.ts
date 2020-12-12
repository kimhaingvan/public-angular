import { HttpService } from './../services/http.service';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiAppService } from "./api-app.service";

@Injectable({
  providedIn: "root",
})
export class ApiAccountService {
  baseURL: string;
  constructor(private http: HttpService, private apiAppService: ApiAppService) {
    this.baseURL = this.apiAppService.baseURL;
  }
  async GetAccounts(req) {
    return await this.http.post(this.baseURL+"/admin/account-management/get-accounts",req).toPromise();
  }

  async UpdateAccount(req) {
    return await this.http.post(this.baseURL+"/admin/account-management/update-account",req).toPromise();
  }

  async CreateAccount(req) {
    return await this.http.post(this.baseURL+"/admin/account-management/create-account",req).toPromise();
  }

  async DeleteAccount(req) {
    return await this.http.post(this.baseURL+"/admin/account-management/delete-account",req).toPromise();
  }

  async SearchAccounts(req) {
    return await this.http.post(this.baseURL+"/admin/account-management/search-accounts",req).toPromise();
  }

  async Login(req) {
    return await this.http.post(this.baseURL+"/admin/account-management/login",req).toPromise();
  }

  async CheckToken() {
    return await this.http.get(this.baseURL+"/update-session-info").toPromise();
  }
  async SendResetPasswordEmailCustomer(req) {
    return await this.http.post(this.baseURL + "/send-reset-password-email-customer",req).toPromise();
  }

  async SendResetPasswordEmailEmployee(req) {
    return await this.http.post(this.baseURL + "/send-reset-password-email-employee",req).toPromise();
  }

  async ResetPassword(req) {
    return await this.http.post(this.baseURL + "/reset-password",req).toPromise();
  }

  async ChangePassword(req) {
    return await this.http.post(this.baseURL + "/change-password",req).toPromise();
  }

  async CreateAccountAndCustomer(req) {
    return await this.http.post(this.baseURL + "/create-customer-account",req).toPromise();
  }

  async CreateAccountAndEmployee(req) {
    return await this.http.post(this.baseURL + "/create-employee-account",req).toPromise();
  }
}
