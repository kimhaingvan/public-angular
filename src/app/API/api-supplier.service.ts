import { HttpService } from './../services/http.service';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiAppService } from "./api-app.service";

@Injectable({
  providedIn: "root",
})
export class ApiSupplierService {
  baseURL: string;
  constructor(private http: HttpService, private apiAppService: ApiAppService) {
    this.baseURL = this.apiAppService.baseURL;
  }
  async GetSuppliers(req) {
    return await this.http.post(this.baseURL+"/admin/supplier-management/get-suppliers",req).toPromise();
  }

  async UpdateSupplier(req) {
    return await this.http.post(this.baseURL+"/admin/supplier-management/update-supplier",req).toPromise();
  }

  async CreateSupplier(req) {
    return await this.http.post(this.baseURL+"/admin/supplier-management/create-supplier",req).toPromise();
  }

  async DeleteSupplier(req) {
    return await this.http.post(this.baseURL+"/admin/supplier-management/delete-supplier",req).toPromise();
  }
  async SearchSuppliers(req) {
    return await this.http.post(this.baseURL+"/admin/supplier-management/search-suppliers",req).toPromise();
  }
}
