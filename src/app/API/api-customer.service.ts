import { HttpService } from './../services/http.service';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiAppService } from "./api-app.service";

@Injectable({
  providedIn: "root",
})
export class ApiCustomerService {
  baseURL: string;
  constructor(private http: HttpService, private apiAppService: ApiAppService) {
    this.baseURL = this.apiAppService.baseURL;
  }
  async GetCustomers(req) {
    return await this.http.post(this.baseURL+"/admin/customer-management/get-customers",req).toPromise();
  }

  async UpdateCustomer(req) {
    return await this.http.post(this.baseURL+"/admin/customer-management/update-customer",req).toPromise();
  }

  async CreateCustomer(req) {
    return await this.http.post(this.baseURL+"/admin/customer-management/create-customer",req).toPromise();
  }

  async DeleteCustomer(req) {
    return await this.http.post(this.baseURL+"/admin/customer-management/delete-customer",req).toPromise();
  }

  async SearchCustomers(req) {
    return await this.http.post(this.baseURL+"/admin/customer-management/search-customers",req).toPromise();
  }
  
  async SearchOrdersByCustomerId(req) {
    return await this.http.post(this.baseURL+"/admin/order-management/search-orders",req).toPromise();
  }


}
