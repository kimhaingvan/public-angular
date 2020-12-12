import { HttpService } from './../services/http.service';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiAppService } from "./api-app.service";

@Injectable({
  providedIn: "root",
})
export class ApiCategoryService {
  baseURL: string;
  constructor(private http: HttpService, private apiAppService: ApiAppService) {
    this.baseURL = this.apiAppService.baseURL;
  }
  async GetCategories(req) {
    return await this.http.post(this.baseURL+"/admin/category-management/get-categories",req).toPromise();
  }

  async UpdateCategory(req) {
    return await this.http.post(this.baseURL+"/admin/category-management/update-category",req).toPromise();
  }

  async CreateCategory(req) {
    return await this.http.post(this.baseURL+"/admin/category-management/create-category",req).toPromise();
  }

  async DeleteCategory(req) {
    return await this.http.post(this.baseURL+"/admin/category-management/delete-category",req).toPromise();
  }
}
