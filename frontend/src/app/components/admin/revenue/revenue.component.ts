import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FaqModel} from '../../../models/faq/faq.model';
import {Payment_detailModel} from '../../../models/payment/payment_detail.model';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {PaymentDetailService} from '../../../services/payment/payment_detail.service';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit {
  p;
  revenues$ = new BehaviorSubject<any>([]);
  constructor(private router: Router, private http: HttpClient, private paymentDetailService: PaymentDetailService) { }

  ngOnInit(): void {
    this.retrieveFaqs();
  }
  retrieveFaqs() {
    this.paymentDetailService.view_revenue().subscribe(faqsData => {
      this.revenues$.next(faqsData.data);
    });
  }
  calculateRevenue(totalSale) {
    let revenue;
    if (totalSale <= 100) {
      revenue = totalSale * (5 / 100);
    } else if (totalSale > 100 && totalSale <= 1000) {
      revenue = totalSale * (4 / 100);
    } else if (totalSale > 1000 && totalSale <= 10000) {
      revenue = totalSale * (3 / 100);
    } else if (totalSale > 10000 && totalSale <= 100000) {
      revenue = totalSale * (2 / 100);
    } else {
      revenue = totalSale * (1 / 100);
    }
    return revenue;
  }
  revenuePercentage(totalSale) {
    let revenue;
    if (totalSale <= 100) {
      revenue = 5;
    } else if (totalSale > 100 && totalSale <= 1000) {
      revenue = 4;
    } else if (totalSale > 1000 && totalSale <= 10000) {
      revenue = 3;
    } else if (totalSale > 10000 && totalSale <= 100000) {
      revenue = 2;
    } else {
      revenue = 1;
    }
    return revenue;
  }
}
