import { HttpService } from './../services/http.service';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiAppService } from "./api-app.service";

@Injectable({
  providedIn: "root",
})
export class ApiScheduleService {
  baseURL: string;
  constructor(private http: HttpService, private apiAppService: ApiAppService) {
    this.baseURL = this.apiAppService.baseURL;
  }
  async GetSchedules(req) {
    return await this.http.post(this.baseURL+"/admin/schedule-management/get-schedules",req).toPromise();
  }

  async UpdateSchedule(req) {
    return await this.http.post(this.baseURL+"/admin/schedule-management/update-schedule",req).toPromise();
  }

  async CreateSchedule(req) {
    return await this.http.post(this.baseURL+"/admin/schedule-management/create-schedule",req).toPromise();
  }

  async DeleteSchedule(req) {
    return await this.http.post(this.baseURL+"/admin/schedule-management/delete-schedule",req).toPromise();
  }
}
