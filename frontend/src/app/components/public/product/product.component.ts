import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ProductModel} from '../../../models/product/product.model';
import {ProductService} from '../../../services/product/product.service';
import {Router} from '@angular/router';
import {AtcService} from '../../../services/product/atc.service';
import {McategoryModel} from '../../../models/category/mcategory.model';
import {ScategoryModel} from '../../../models/category/scategory.model';
import {ScategoryService} from '../../../services/category/scategory.service';
import {McategoryService} from '../../../services/category/mcategory.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  mCatid = '';
  sCatid = '';
  isSelectMcat = false;
  p;
  mcats$ = new BehaviorSubject<McategoryModel[]>([]);
  scats$ = new BehaviorSubject<ScategoryModel[]>([]);
  products$ = new BehaviorSubject<ProductModel[]>([]);
  constructor(private productService: ProductService , private router: Router, private mcategoryService: McategoryService,
              private scategoryService: ScategoryService,
              private toastrService: ToastrService, private atcService: AtcService) {}
  ngOnInit() {
    this.retriveMcat();
    this.getProducts();
  }
  getProducts() {
    this.productService.retrievePros().subscribe((proDatas) => {
      this.products$.next(proDatas.data);
    });
  }
  saveProducts(slug) {
    this.atcService.saveProducts(slug);
  }
  viewDetail(slug) {
    this.router.navigate(['/product-detail', slug ]);
  }
  getImages(images) {
    let imageArray;
    imageArray  = images.split(',');
    return imageArray;
  }

  onSelectMcat(event) {
    this.mCatid = event.target.value;
    if (event.target.value != '0') {
      this.isSelectMcat = true;
      this.retrieveScats(event.target.value);
    } else {
      this.isSelectMcat = false;
      this.scats$ = null;
    }
  }
  retriveMcat() {
    this.mcategoryService.retrieveMcats().subscribe(mCatData => {
      this.mcats$.next(mCatData.data);
    });
  }
  retrieveScats(mCatid) {
    this.scategoryService.retrieveScatsiD(mCatid).subscribe(subCatData => {
      this.scats$.next(subCatData.data);
    });
  }
  onSelectScat(event) {
    this.sCatid = event.target.value;
    if (this.isSelectMcat) {
     if (this.sCatid !== '0' ) {
       this.productService.filterPros(this.mCatid, this.mCatid).subscribe((proDatas) => {
         this.products$.next(proDatas.data);
       });
     }
   } else {
      this.toastrService.error('Please Choice Main Category', 'Error');
    }
  }
}
