import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URL_HOST} from '../../utils/Setting';
import {map} from 'rxjs/operators';
@Injectable({ providedIn: 'root' })

export class ShopkeeperReportService {
  constructor(private http: HttpClient) {}
  retrieveYearSale(year, id) {
    return this.http.get(URL_HOST + '/api/report/shopkeeper_product_year_sales?pid=' + id + '&tdate=' + year);
  }
  retrieveMonthlySale(year, month, id) {
    return this.http.get(URL_HOST + '/api/report2/shopkeeper_product_monthly_sales?sid=' + id + '&year=' + year + '&month=' + month);
  }
}
