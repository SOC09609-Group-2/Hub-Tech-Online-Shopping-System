import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductService} from './product.service';
import {ToastrService} from 'ngx-toastr';
@Injectable({ providedIn: 'root' })

export class AtcService {
  productItem = [];
  cartProduct;
  constructor(private http: HttpClient, private productService: ProductService, private toastr: ToastrService) {}
  saveProducts(slug) {
    this.productItem = JSON.parse(localStorage.getItem('items'));
    this.productService.retrieveStorePros(slug).subscribe((proData) => {
      console.log(proData.data[0]);
      this.addToCart(proData.data[0]);
      this.cartProduct = this.getProData();
    });
  }

  addToCart(proData) {
    const ary =   JSON.parse(localStorage.getItem('items')) ;
    if (ary == null) {
      const qty = {qty: 1};
      const totalPrice = {totalPrice: proData.price};
      const itemAry = [Object.assign({}, proData, qty, totalPrice)] ;
      localStorage.setItem('items', JSON.stringify(itemAry));
    } else {
      ary.push(proData);
      console.log(ary);
      const filteredArr = ary.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
          const qty = {qty: 1};
          const totalPrice = {totalPrice: current.price}
          return acc.concat([Object.assign({}, current, qty, totalPrice)]);
        } else {
          return acc;
        }
      }, []);
      localStorage.setItem('items', JSON.stringify(filteredArr));
    }
    this.toastr.success('Item already Add to Cart!', 'Success Message');
  }
  getProData() {
    const ary =   JSON.parse(localStorage.getItem('items')) ;
    if (ary) {
      return ary;
    } else {
      return ary;
    }
  }
}
