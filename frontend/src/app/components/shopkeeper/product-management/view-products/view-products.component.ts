import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../../../services/product/product.service';
import {BehaviorSubject} from 'rxjs';
import {ProductModel} from '../../../../models/product/product.model';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {Router} from '@angular/router';
import {McategoryService} from '../../../../services/category/mcategory.service';
import {ToastrService} from 'ngx-toastr';
import {ProductModalComponent} from '../product-modal/product-modal.component';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {
  p;
  modalRef: MDBModalRef;
  products$ = new BehaviorSubject<ProductModel[]>([]);
  constructor(private productService: ProductService, private router: Router, private toastr: ToastrService,
              private mcategoryService: McategoryService, private modalService: MDBModalService) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }
  retrieveProducts() {
    this.productService.viewPros().subscribe((proDatas) => {
      this.products$.next(proDatas['data']);
      console.log(proDatas);
    });
  }
  proModal(imageName, content) {
    const modalOptions = {
      data: {
        heading: 'Product Description',
        imageName,
        content
      }
    };
    this.modalRef = this.modalService.show(ProductModalComponent, modalOptions);
  }
  editProduct(slug, mcatID, subcatID, productID) {
    console.log(mcatID);
    console.log(subcatID);
    localStorage.setItem('slug', slug);
    localStorage.setItem('productID', productID);
    localStorage.setItem('mcatID', mcatID.value);
    localStorage.setItem('subCatID', subcatID.value);
    this.router.navigate(['/shopkeeper_dashboard/edit_product', slug ]);
  }

  updateProduct(slug) {
    console.log(slug);
  }

  dateFormat(dateStr) {
    if (dateStr) {
      return  dateStr.replace('T', ' ');
    } else {
      return 'No Modified';
    }
  }

  deleteProduct(id) {
    const message = 'Product Delete Success!';
    const title = 'Success Message';
    this.productService.deleteProduct(id).subscribe(() => {
      this.toastr.success(message, title);
      this.retrieveProducts();
    });
  }


}
