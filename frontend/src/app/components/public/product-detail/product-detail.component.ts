import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductService} from '../../../services/product/product.service';
import {AtcService} from '../../../services/product/atc.service';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from '../../../services/login/authentication.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  senderId;
  product$ = [];
  slug: string;
  constructor(private route: ActivatedRoute, private router: Router, private toastrService: ToastrService,
              private atcService: AtcService, private  productService: ProductService,
              private auth: AuthenticationService) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      console.log(this.auth.getId());
      this.senderId = this.auth.getId();
    }
    this.route.params.subscribe(
      (params: Params) => {
        this.slug = params.slug;
        this.retrieveSingleProduct(this.slug);
      }
    );
  }
  retrieveSingleProduct(slug) {
    this.productService.retrieveStorePros(slug).subscribe(prosData => {
      if (prosData.status != 404) {
        this.product$.push(prosData.data[0]);
      } else {
        this.router.navigate(['']);
      }
    });
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
