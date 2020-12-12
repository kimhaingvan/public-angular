import { HttpService } from './../services/http.service';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiAppService } from "./api-app.service";

@Injectable({
  providedIn: "root",
})
export class ApiRoleService {
  baseURL: string;
  constructor(private http: HttpService, private apiAppService: ApiAppService) {
    this.baseURL = this.apiAppService.baseURL;
  }
  async GetRoles(req) {
    return await this.http.post(this.baseURL+"/admin/role-management/get-roles",req).toPromise();
  }

  async UpdateRole(req) {
    return await this.http.post(this.baseURL+"/admin/role-management/update-role",req).toPromise();
  }

  async CreateRole(req) {
    return await this.http.post(this.baseURL+"/admin/role-management/create-role",req).toPromise();
  }

  async DeleteRole(req) {
    return await this.http.post(this.baseURL+"/admin/role-management/delete-role",req).toPromise();
  }
}
