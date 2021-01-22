import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_HOST} from '../../utils/Setting';
import {Payment_detailModel} from '../../models/payment/payment_detail.model';
import {Observable} from 'rxjs';
@Injectable({ providedIn: 'root' })

export class PaymentDetailService {
  constructor(private http: HttpClient) {}
  inertPayment(proData, paymentID: number, customerSlug: string, orderNo: string) {
    const paymentData: Payment_detailModel = {
      order_no: orderNo,
      payment_id: paymentID,
      product_id: proData.id,
      product_name: proData.name,
      qty: proData.qty,
      total_price: proData.totalPrice,
      unit_price: proData.price,
      customerSlug,
      supplier_id: proData.supplier_id};
    return this.http.post(URL_HOST + '/api/insert_payment_detail', paymentData);
  }
  customer_order(id, date): Observable<any> {
    return this.http.get(URL_HOST + '/api/payment_detail/view_order_detail?pid=' + id + '&tdate=' + date);
  }
  order_customer_view(slug, date): Observable<any> {
    return this.http.get(URL_HOST + '/api/order_customer_view/' + slug + '/' + date);
  }
}
