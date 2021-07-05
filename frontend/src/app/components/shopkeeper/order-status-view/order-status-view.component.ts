import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PaymentDetailService} from '../../../services/payment/payment_detail.service';
import {AuthenticationService} from '../../../services/login/authentication.service';
import {ProductModel} from '../../../models/product/product.model';
import {Payment_detailModel} from '../../../models/payment/payment_detail.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-order-status-view',
  templateUrl: './order-status-view.component.html',
  styleUrls: ['./order-status-view.component.scss']
})
export class OrderStatusViewComponent implements OnInit {
  orderDatas$ = new BehaviorSubject<any>([]);
  p;
  selectDate: string;
  testSlug = 'tQelUkRfhJZTjoKpRfkaaw';
  curretYear = new Date().getFullYear();
  curretMonth = new Date().getMonth() + 1;
  curretDay = new Date().getDate();
  spr = (this.curretMonth > 9) ? '-' : '-0';
  cYM = String(this.curretYear) + this.spr + String(this.curretMonth) + '-' + String(this.curretDay);
  constructor(private paymentDetailService: PaymentDetailService, private toastr: ToastrService,
              private auth: AuthenticationService) { }

  ngOnInit(): void {
    console.log(this.testSlug);
    this.viewOrder(null);
  }
  viewOrder(date) {
    if (date != null) {
      this.selectDate = date.target.value;
      this.paymentDetailService.view_Order_status(this.testSlug, date.target.value).subscribe(orderData => {
        this.orderDatas$.next(orderData.data);
      });
    } else {
      this.paymentDetailService.view_Order_status(this.testSlug, this.cYM).subscribe(orderData => {
        this.orderDatas$.next(orderData.data);
      });
    }
  }
  onSeletProgress(event, orderNo) {
    this.paymentDetailService.updateOrderStatus(event.target.value, orderNo).subscribe(status => {
      this.toastr.success('Update Order Status', 'Success Message');
      if (this.selectDate != null) {
        this.paymentDetailService.view_Order_status(this.testSlug, this.selectDate).subscribe(orderData => {
          this.orderDatas$.next(orderData.data);
        });
      } else {
        this.paymentDetailService.view_Order_status(this.testSlug, this.cYM).subscribe(orderData => {
          this.orderDatas$.next(orderData.data);
        });
      }
    });
  }

}
