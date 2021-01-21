import { Component, OnInit } from '@angular/core';
import {ShopkeeperReportService} from '../../../services/shopkeeper-report/product-report.service';
import {AuthenticationService} from '../../../services/login/authentication.service';

@Component({
  selector: 'app-product-sale-report',
  templateUrl: './product-sale-report.component.html',
  styleUrls: ['./product-sale-report.component.scss']
})
export class ProductSaleReportComponent implements OnInit {
  years = [];
  supplierID;
  isSelectYearSale = false;
  isSelectMonthlySale = false;
  productData;
  monthlyProductData;
  curretYear = new Date().getFullYear();
  curretMonth = new Date().getMonth() + 1;
  spr = (this.curretMonth > 9) ? '-' : '-0';
  cYM = String(this.curretYear) + this.spr + String(this.curretMonth);
  constructor(private productReportService: ShopkeeperReportService, private authenticationService: AuthenticationService) {}
  public chartType = 'bar';

  public YearChartDatasets: Array<any> = [
    { data: [], label: '' }
  ];

  public MonthlyChartDatasets: Array<any> = [
    { data: [], label: '' }
  ];

  public YearChartLabels: Array<any> = [];

  public MonthlyChartLabels: Array<any> = [];

  public ChartColors: Array<any> = [{backgroundColor: 'rgb(34,45,80)'}];

  public ChartOptions: any = {responsive: true};

  async ngOnInit(): Promise<void> {
    this.supplierID = this.authenticationService.getId();
    if (!this.isSelectYearSale) {
      const ChartData = [];
      this.YearChartLabels = [];
      this.productData = await this.productReportService.retrieveYearSale(this.curretYear, this.supplierID  ).toPromise();
      console.log(this.productData)
      this.productData['data'].forEach((item, index) => {
        ChartData.push(item.total_sale);
        this.YearChartLabels.push(item.product_name);
      });
      this.YearChartDatasets = [
        {data: ChartData, label: 'Year Sale is Dollar' },
      ];
    }
    if (!this.isSelectMonthlySale) {
      const ChartData = [];
      this.MonthlyChartLabels = [];
      this.monthlyProductData = await this.productReportService.retrieveMonthlySale(this.curretYear, this.curretMonth, this.supplierID ).toPromise();
      this.monthlyProductData['data'].forEach((item, index) => {
        ChartData.push(item.total_sale);
        this.MonthlyChartLabels.push(item.product_name);
      });
      this.MonthlyChartDatasets = [
        {data: ChartData, label: 'Monthly Sale is Dollar' },
      ];
    }
    this.generateYear();
  }

  async retrieveYearSale(event) {
    this.isSelectYearSale = true;
    const ChartData = [];
    this.YearChartLabels = [];
    this.productData = await this.productReportService.retrieveYearSale(event.target.value, this.supplierID ).toPromise();
    this.productData['data'].forEach((item, index) => {
      ChartData.push(item.total_sale);
      this.YearChartLabels.push(item.product_name);
    });
    this.YearChartDatasets = [
      {data: ChartData, label: 'Year Sale is Dollar' },
    ];
  }

  async retrieveMonthlySale(data) {
    this.isSelectMonthlySale = true;
    const date = new Date(data.target.value);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const ChartData = [];
    this.MonthlyChartLabels = [];
    this.monthlyProductData = await this.productReportService.retrieveMonthlySale(year, month, this.supplierID ).toPromise();
    this.monthlyProductData['data'].forEach((item, index) => {
      ChartData.push(item.total_sale);
      this.MonthlyChartLabels.push(item.product_name);
    });
    this.MonthlyChartDatasets = [
      {data: ChartData, label: 'Monthly Sale is Dollar' },
    ];
  }
  generateYear() {
    for (let i = 2000; i < 2200; i++) {
      this.years.push(i);
    }
  }

}
