import { Component, OnInit } from '@angular/core';
import {AtcService} from '../../../services/product/atc.service';
import {BehaviorSubject, interval} from 'rxjs';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {PaymentService} from '../../../services/payment/payment.service';
import {PaymentDetailService} from '../../../services/payment/payment_detail.service';
import {AuthenticationService} from '../../../services/login/authentication.service';



@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss']
})
export class CartProductComponent implements OnInit {
  constructor(private router: Router, private atcService: AtcService, private paymentService: PaymentService,
              private paymentDetailService: PaymentDetailService, private toastr: ToastrService, public auth: AuthenticationService) { }
  p;
  products = null;
  totalPrice;
  isfinish = false;
  uniqueSlug: string;
  generateDateNow: string;

  ngOnInit(): void {
    this.loadStripe();
    this.getProData();
    if (this.products != null) {
      this.getFinalPrice(this.products);
    }
    interval(1000).subscribe(() => {
      const amount = sessionStorage.getItem('isCheckout');
      if (amount) {
        this.insertPayment(amount);
        this.router.navigate(['']);
        this.isfinish = true;
      }
    });
  }
  getProData() {
    this.products = this.atcService.getProData();
  }
  inCrease(id, pty, totalPrice, finalPrice) {
    this.totalPrice = 0;
    const results = JSON.parse(localStorage.getItem('items'));
    results.forEach((result) => {
      this.totalPrice += result.totalPrice;
      if (result.id === id) {
        result.qty = result.qty + 1;
        pty.value = result.qty;
        result.totalPrice = result.price * result.qty;
        totalPrice.value =  '$' + result.totalPrice;
      }
    });
    localStorage.setItem('items', JSON.stringify(results));
    const finalResults = JSON.parse(localStorage.getItem('items'));
    finalPrice.value = String(this.getFinalPrice(finalResults));
  }

  deCrease(id, pty, totalPrice, finalPrice) {
    this.totalPrice = 0;
    const results = JSON.parse(localStorage.getItem('items'));
    results.forEach((result) => {
      if (result.id === id) {
        if (result.qty >= 2) {
          result.qty = result.qty - 1;
          pty.value = result.qty;
          result.totalPrice = result.price * result.qty;
          totalPrice.value =  '$' + result.totalPrice;
        }
      }
    });
    localStorage.setItem('items', JSON.stringify(results));
    const finalResults = JSON.parse(localStorage.getItem('items'));
    finalPrice.value = String(this.getFinalPrice(finalResults));
  }
  getFinalPrice(arr) {
    this.totalPrice = 0;
    for (let i = 0; i < arr.length; i++) {
      this.totalPrice += arr[i].totalPrice;
    }
    return this.totalPrice;
  }


  deleteItem(id) {
    const results = JSON.parse(localStorage.getItem('items'));
    if (results != null) {
      results.forEach((result) => {
        if (result.id == id) {
          const ind = results.indexOf(result);
          results.splice(ind, 1);
          this.toastr.success('Deleted Item Success', 'Success Message');
        }
      });
    }
    localStorage.setItem('items', JSON.stringify(results));
    this.getProData();
    this.getFinalPrice(this.products);
  }
  removeCart() {
    localStorage.removeItem('items');
    this.toastr.success ('Success Clear Cart', 'Success Message');
    this.router.navigate(['']);
  }
  insertPayment(amount) {
    const date = new Date();
    sessionStorage.removeItem('isCheckout');
    const productArray = JSON.parse(localStorage.getItem('items'));

    if (this.auth.isLoggedIn()) {
      if (productArray != null) {
        this.paymentService.sendMail(this.uniqueNumber(), this.generateDate(), this.auth.getName(), this.auth.getEmail(),
          this.auth.getAddress(), amount , productArray).subscribe(res => {
        });
        this.paymentService.inertPayment(this.auth.getSlug(), this.uniqueNumber(), this.generateDate(), this.generateDateTime()).subscribe(res => {
          this.pay(amount);
          const paymentId = res['data']['id'];
          const customerSlug = res['data']['customer_slug'];
          const orderNo = res['data']['order_no'];
          for (let i = 0; i < productArray.length; i++) {
            this.paymentDetailService.inertPayment(productArray[i], paymentId, customerSlug, orderNo, String(date.getMonth() + 1),
              this.generateDate(), this.generateDateTime()).subscribe(() => {
                localStorage.removeItem('items');
                this.getProData();
            });
          }
          this.toastr.success('Product Checkout Success', 'Success Message');
        });
      } else {
        this.toastr.error('There have no product to check out!', 'Error Message');
      }
    } else {
      this.toastr.error('Need to Login or Register to Checkout', 'Error Message');
    }

  }
  loadStripe() {
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }
  }

  pay(amount) {
    if (this.isfinish == false){
      var handler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_NyQgIgdn3LrhUFe3xN8yHFrE009lbtBzPb',
        locale: 'auto',
        token: function (token: any) {
          sessionStorage.setItem('isCheckout', amount);
        }
      })

      handler.open({
        name: 'Hub Tech',
        email: 'hubtech2022@gmail.com',
        description: 'Pay with Card',
        image: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-22fea.appspot.com/o/Product%20Images%2Flogo.png?alt=media&token=8d77aca8-9536-4abf-88d6-f80d306d12f2',
        amount: amount * 100
      });
    }
  }
  getImages(images) {
    let imageArray;
    imageArray  = images.split(',');
    return imageArray;
  }

  uniqueNumber(): string {
    const date = new Date();
    // tslint:disable-next-line:max-line-length
    this.uniqueSlug = date.getFullYear().toString() + this.pad2(date.getMonth() + 1) +
      this.pad2( date.getDate()) + this.pad2( date.getHours() ) + this.pad2( date.getMinutes());
    return this.uniqueSlug;
  }

  generateDateTime(): string {
    const date = new Date();
    // tslint:disable-next-line:max-line-length
    this.generateDateNow = date.getFullYear().toString() + '-' + this.pad2(date.getMonth() + 1) +
      '-' + this.pad2( date.getDate()) + ' ' + this.pad2( date.getHours() ) + ':' + this.pad2( date.getMinutes() ) +
      ':' + this.pad2( date.getSeconds() );
    return this.generateDateNow;
  }

  generateDate(): string {
    const date = new Date();
    // tslint:disable-next-line:max-line-length
    this.generateDateNow = date.getFullYear().toString() + '-' + this.pad2(date.getMonth() + 1) +
      '-' + this.pad2( date.getDate()) ;
    return this.generateDateNow;
  }

  pad2(n) {
    return n < 10 ? '0' + n : n;
  }

}
