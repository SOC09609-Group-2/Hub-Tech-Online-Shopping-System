import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../services/product/product.service';
import {BehaviorSubject} from 'rxjs';
import {ProductModel} from '../../../models/product/product.model';
import {Router} from '@angular/router';
import {AtcService} from '../../../services/product/atc.service';
import {CommentService} from "../../../services/comment/comment.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nproduct$ = new BehaviorSubject<ProductModel[]>([]);
  bproduct$ = new BehaviorSubject<ProductModel[]>([]);
  constructor(private productService: ProductService, private router: Router,
              private atcService: AtcService) { }

  ngOnInit(): void {
    this.newArrival();
    this.bestSeller();
  }

  newArrival(){
    this.productService.newArrival().subscribe(ProductData => {
      this.nproduct$.next(ProductData.data);
    });
  }

  bestSeller(){
    this.productService.bestSeller().subscribe(ProductData => {
      this.bproduct$.next(ProductData.data);
      console.log(ProductData.data);
    });
  }

  viewDetail(slug) {
    this.router.navigate(['/product-detail', slug ]);
  }
  getImages(images) {
    let imageArray;
    imageArray  = images.split(',');
    return imageArray;
  }
  saveProducts(slug) {
    this.atcService.saveProducts(slug);
  }


}
