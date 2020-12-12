import { HttpService } from './../services/http.service';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiAppService } from "./api-app.service";

@Injectable({
  providedIn: "root",
})
export class ApiEmployeeService {
  baseURL: string;
  constructor(private http: HttpService, private apiAppService: ApiAppService) {
    this.baseURL = this.apiAppService.baseURL;
  }
  async GetEmployees(req) {
    return await this.http.post(this.baseURL+"/admin/employee-management/get-employees",req).toPromise();
  }

  async UpdateEmployee(req) {
    return await this.http.post(this.baseURL+"/admin/employee-management/update-employee",req).toPromise();
  }

  async CreateEmployee(req) {
    return await this.http.post(this.baseURL+"/admin/employee-management/create-employee",req).toPromise();
  }

  async DeleteEmployee(req) {
    return await this.http.post(this.baseURL+"/admin/employee-management/delete-employee",req).toPromise();
  }

  async SearchEmployees(req) {
    return await this.http.post(this.baseURL+"/admin/employee-management/search-employees",req).toPromise();
  }
}
