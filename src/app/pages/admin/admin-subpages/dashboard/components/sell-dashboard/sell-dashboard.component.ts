import { Component, OnInit } from '@angular/core';
import {OrderQuery} from "../../../../../../states/order-store/order.query";
import {OrderService} from "../../../../../../states/order-store/order.service";
declare var google: any;

@Component({
  selector: 'app-sell-dashboard',
  templateUrl: './sell-dashboard.component.html',
  styleUrls: ['./sell-dashboard.component.scss']
})
export class SellDashboardComponent implements OnInit {
  dashboard: any;
  constructor(
    private orderQuery: OrderQuery,
    private orderService: OrderService
  ) { }

  async ngOnInit() {
    this.dashboard = await this.orderService.statistic()
    google.load("visualization", "1", {packages:["corechart"]});
    await google.setOnLoadCallback(this.drawChart());
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(this.drawChart2());
  }


  convertData(revenues) {
    let revenueData = [["Ngày", "Doanh thu", {role: "style"}]]
    revenues.forEach(revenue => {
      let revenueItem = []
      let date = new Date(revenue.date)
      revenueItem.push(date.getDate() + '-' + (date.getMonth()+1));
      revenueItem.push(revenue.revenue);
      revenueItem.push("stroke-width: 100");
      revenueData.push(revenueItem);
    })
    return revenueData;
  }

  convertData2(revenues) {
    let revenueData = [["Tháng", "Doanh thu"]]
    revenues.forEach(revenue => {
      let revenueItem = []
      revenueItem.push('Tháng '+ revenue.month);
      revenueItem.push(revenue.revenue);
      revenueData.push(revenueItem);
    })
    return revenueData;
  }

  async drawChart2() {
    this.dashboard = await this.orderService.statistic()
    let revenueData = this.convertData2(this.dashboard.revenue_of_each_month_in_year.value)
    var data = google.visualization.arrayToDataTable(revenueData);
    var options = {
      title: 'Doanh thu theo tháng trong năm',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
  }

  async drawChart() {
    this.dashboard = await this.orderService.statistic()
    let revenueData = this.convertData(this.dashboard.revenues_each_day_in_month.value)
    var data = google.visualization.arrayToDataTable(revenueData);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
      { calc: "stringify",
        sourceColumn: 1,
        type: "string",
        role: "annotation",
      },
      2]);

    var options = {
      title: "Doanh thu trong tháng",
      bar: {groupWidth: "75%"},
      legend: { position: "none" },
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
    chart.draw(view, options);
  }
}
