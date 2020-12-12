import { HttpService } from '../services/http.service';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiAppService } from "./api-app.service";

@Injectable({
  providedIn: "root",
})
export class ApiAuthorService {
  baseURL: string;
  constructor(private http: HttpService, private apiAppService: ApiAppService) {
    this.baseURL = this.apiAppService.baseURL;
  }
  async GetAuthors(req) {
    return await this.http.post(this.baseURL+"/admin/author-management/get-authors",req).toPromise();
  }

  async UpdateAuthor(req) {
    return await this.http.post(this.baseURL+"/admin/author-management/update-author",req).toPromise();
  }

  async CreateAuthor(req) {
    return await this.http.post(this.baseURL+"/admin/author-management/create-author",req).toPromise();
  }

  async DeleteAuthor(req) {
    return await this.http.post(this.baseURL+"/admin/author-management/delete-author",req).toPromise();
  }
}
