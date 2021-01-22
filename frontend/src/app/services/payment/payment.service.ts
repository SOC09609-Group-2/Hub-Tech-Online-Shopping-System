import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_HOST} from '../../utils/Setting';
import {PaymentModel} from '../../models/payment/payment.model';
import {Observable, observable} from 'rxjs';
@Injectable({ providedIn: 'root' })

export class PaymentService {
  constructor(private http: HttpClient) {}
  inertPayment(customerSlug: string) {
    const paymentData: PaymentModel = {customerSlug};
    return this.http.post(URL_HOST + '/api/insert_payment', paymentData,
      {
        observe: 'response'
      });
  }
  retrievePayments(): Observable<any> {
    return this.http.get(URL_HOST + '/api/view_payments');
  }
}
