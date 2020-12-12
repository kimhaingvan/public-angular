import { HttpService } from './../services/http.service';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiAppService } from "./api-app.service";

@Injectable({
  providedIn: "root",
})
export class ApiBookService {
  baseURL: string;
  constructor(private http: HttpService, private apiAppService: ApiAppService) {
    this.baseURL = this.apiAppService.baseURL;
  }
  async GetBooks(req) {
    return await this.http.post(this.baseURL+"/admin/book-management/get-books",req).toPromise();
  }

  async UpdateBook(req) {
    return await this.http.post(this.baseURL+"/admin/book-management/update-book",req).toPromise();
  }

  async CreateBook(req) {
    return await this.http.post(this.baseURL+"/admin/book-management/create-book",req).toPromise();
  }

  async SearchBooks(req) {
    return await this.http.post(this.baseURL+"/admin/book-management/search-books",req).toPromise();
  }

  async DeleteBook(req) {
    return await this.http.post(this.baseURL+"/admin/book-management/delete-book",req).toPromise();
  }

  async UpdateBookImage(imageForm, opt) {
    return await this.http.post(this.baseURL+"/admin/book-management/upload-book-image",imageForm, opt).toPromise();
  }
}
