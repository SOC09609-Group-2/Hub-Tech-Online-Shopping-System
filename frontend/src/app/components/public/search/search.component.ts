import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductService} from '../../../services/product/product.service';
import {AtcService} from '../../../services/product/atc.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  p;
  isFound = true;
  products$ = new BehaviorSubject<any>([]);
  keyword: string;
  constructor(private route: ActivatedRoute, private router: Router,
              private productService: ProductService, private atcService: AtcService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.keyword = params.keyword;
        this.productService.searchProduct(this.keyword).subscribe(searchData => {
          if (Object.keys(searchData).length != 0) {
            this.products$.next(searchData.data);
            this.isFound = true;
          } else {
            this.isFound = false;
          }
        });
      }
    );
  }

  viewDetail(slug) {
    console.log(slug);
    this.router.navigate(['/product-detail', slug ]);
  }
  saveProducts(slug) {
    this.atcService.saveProducts(slug);
  }
  getImages(images) {
    let imageArray;
    imageArray  = images.split(',');
    return imageArray;
  }
}
