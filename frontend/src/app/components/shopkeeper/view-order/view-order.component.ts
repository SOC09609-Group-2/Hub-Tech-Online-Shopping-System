import { Component, OnInit } from '@angular/core';
import {PaymentDetailService} from '../../../services/payment/payment_detail.service';
import {BehaviorSubject} from 'rxjs';
import {AuthenticationService} from '../../../services/login/authentication.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {
  orderDatas$ = new BehaviorSubject<any>([]);
  p;
  curretYear = new Date().getFullYear();
  curretMonth = new Date().getMonth() + 1;
  curretDay = new Date().getDate();
  spr = (this.curretMonth > 9) ? '-' : '-0';
  cYM = String(this.curretYear) + this.spr + String(this.curretMonth) + '-' + String(this.curretDay);
  constructor(private paymentDetailService: PaymentDetailService, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.viewOrder(null);
  }
  viewOrder(date) {
    if (date != null) {
      this.paymentDetailService.customer_order(this.auth.getId(), date.target.value).subscribe(orderData => {
        this.orderDatas$.next(orderData.data);
      });
    } else {
      this.paymentDetailService.customer_order(this.auth.getId(), this.cYM).subscribe(orderData => {
        this.orderDatas$.next(orderData.data);
      });
    }

  }
  dateFormat(dateStr) {
    if (dateStr) {
      return  dateStr.replace('T', ' ');
    } else {
      return 'No Modified';
    }
  }
}
