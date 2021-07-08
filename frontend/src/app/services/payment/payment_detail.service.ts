import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_HOST} from '../../utils/Setting';
import {Payment_detailModel} from '../../models/payment/payment_detail.model';
import {Observable} from 'rxjs';
@Injectable({ providedIn: 'root' })

export class PaymentDetailService {
  constructor(private http: HttpClient) {}
  inertPayment(proData, paymentID: number, customerSlug: string, orderNo: string, month: string, odate: string, cdate: string) {
    const date = new Date();
    const paymentData: Payment_detailModel = {
      order_no: orderNo,
      payment_id: paymentID,
      product_id: proData.id,
      product_name: proData.name,
      qty: proData.qty,
      total_price: proData.totalPrice,
      unit_price: proData.price,
      year: date.getFullYear().toString(),
      month,
      date: odate,
      created_at: cdate,
      order_status: 'Order Processed',
      customer_slug: customerSlug,
      supplier_id: proData.supplier_id};
    return this.http.post(URL_HOST + '/api/payment_detail', paymentData);
  }

  customer_order(id, date): Observable<any> {
    return this.http.get(URL_HOST + '/api/payment_detail/view_order_detail?pid=' + id + '&tdate=' + date);
  }

  view_revenue(): Observable<any> {
    return this.http.get(URL_HOST + '/api/payment_detail/view_revenue');
  }
  order_customer_view(slug, date): Observable<any> {
    return this.http.get(URL_HOST + '/api/payment_detail/customer_view_order_detail?ddate=' + date + '&slug=' + slug);
  }
  order_Order_status(slug, date): Observable<any> {
    return this.http.get(URL_HOST + '/api/payment_detail/order_status_detail?ddate=' + date + '&slug=' + slug);
  }
  view_Order_status(id, date): Observable<any> {
    return this.http.get(URL_HOST + '/api/payment_detail/view_order_status?ddate=' + date + '&id=' + id);
  }

  updateOrderStatus(orderStatus, orderNo): Observable<any>  {
    return this.http.get(URL_HOST + '/api/payment_detail/updateStatus?order_status=' + orderStatus + '&order_no=' + orderNo);
  }
}
