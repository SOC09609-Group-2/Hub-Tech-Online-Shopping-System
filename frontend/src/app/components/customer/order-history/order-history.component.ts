import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PaymentDetailService} from '../../../services/payment/payment_detail.service';
import {AuthenticationService} from '../../../services/login/authentication.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {


  orderDatas$ = new BehaviorSubject<any>([]);
  p;
  testSlug = this.auth.getSlug();
  curretYear = new Date().getFullYear();
  curretMonth = new Date().getMonth() + 1;
  curretDay = new Date().getDate();
  spr = (this.curretMonth > 9) ? '-' : '-0';
  cYM = String(this.curretYear) + this.spr + String(this.curretMonth) + '-' + String(this.curretDay);
  constructor(private paymentDetailService: PaymentDetailService, private auth: AuthenticationService) { }

  ngOnInit(): void {
    console.log(this.testSlug);
    this.viewOrder(null);
  }
  viewOrder(date) {
    if (date != null) {
      this.paymentDetailService.order_customer_view(this.testSlug, date.target.value).subscribe(orderData => {
        this.orderDatas$.next(orderData.data);
      });
    } else {
      this.paymentDetailService.order_customer_view(this.testSlug, this.cYM).subscribe(orderData => {
        this.orderDatas$.next(orderData.data);
      });
    }
  }


}
