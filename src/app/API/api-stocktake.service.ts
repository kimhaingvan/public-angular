import { HttpService } from './../services/http.service';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiAppService } from "./api-app.service";

@Injectable({
  providedIn: "root",
})
export class ApiStocktakeService {
  baseURL: string;
  constructor(private http: HttpService, private apiAppService: ApiAppService) {
    this.baseURL = this.apiAppService.baseURL;
  }
  async GetStocktakes(req) {
    return await this.http.post(this.baseURL+"/admin/stocktake-management/get-stocktakes",req).toPromise();
  }

  async UpdateStocktake(req) {
    return await this.http.post(this.baseURL+"/admin/stocktake-management/update-stocktake",req).toPromise();
  }

  async CreateStocktake(req) {
    return await this.http.post(this.baseURL+"/admin/stocktake-management/create-stocktake",req).toPromise();
  }

  async DeleteStocktake(req) {
    return await this.http.post(this.baseURL+"/admin/stocktake-management/delete-stocktake",req).toPromise();
  }
}
