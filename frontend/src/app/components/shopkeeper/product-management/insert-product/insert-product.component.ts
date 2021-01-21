import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {UploadFileService} from '../../../../services/UploadFileService ';
import {ProductModel} from '../../../../models/product/product.model';
import {McategoryModel} from '../../../../models/category/mcategory.model';
import {McategoryService} from '../../../../services/category/mcategory.service';
import {ScategoryService} from '../../../../services/category/scategory.service';
import {ScategoryModel} from '../../../../models/category/scategory.model';
import {ProductService} from '../../../../services/product/product.service';
import {Md5} from 'ts-md5';
import {AuthenticationService} from '../../../../services/login/authentication.service';


@Component({
  selector: 'app-insert-product',
  templateUrl: './insert-product.component.html',
  styleUrls: ['./insert-product.component.scss']
})
export class InsertProductComponent implements OnInit {
  productValidation = new ProductModel();

  mCatid = '';
  sCatid = '';
  isSelectMcat = false;
  selectedFiles: FileList;
  fileNameArray = [];
  rawfileName;
  fileName;
  uniqueSlug: string;
  generateDateNow: string;
  mcats$ = new BehaviorSubject<McategoryModel[]>([]);
  scats$ = new BehaviorSubject<ScategoryModel[]>([]);

  constructor(private uploadService: UploadFileService, private toastrService: ToastrService,
              private mcategoryService: McategoryService, private scategoryService: ScategoryService,
              private productService: ProductService, private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.retriveMcat();
  }
  selectFiles(event) {
    const indexNum = Number(event.target.files.length) - 1;
    this.selectedFiles = event.target.files;
    for (let i = 0; i < event.target.files.length; i++) {
      if (i < indexNum) {
        this.rawfileName +=  this.uniqueNumber() + String(event.target.files[i].name + ',');
      } else {
        this.rawfileName +=  this.uniqueNumber() + String(event.target.files[i].name);
      }
    }
    this.fileName = this.rawfileName.replace('undefined', '');
    console.log(this.fileName);
  }

  uploadFiles() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(this.selectedFiles[i]);
    }
  }

  upload(file) {
    this.uploadService.upload(file).subscribe(event => {
      this.fileNameArray.push(event['fileName'][0]);
      });
  }
   pad2(n) {
    return n < 10 ? '0' + n : n;
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
  getID() {
    return this.auth.getId();
  }
  insertProduct(pform: NgForm, productData: ProductModel) {
      if (this.isSelectMcat) {
        if (this.sCatid) {
          productData.cat_id = Number(this.mCatid);
          productData.sub_cat_id = Number(this.sCatid);
          productData.supplier_id = Number(this.getID());
          productData.image_name = this.fileName;
          productData.slug = String(Md5.hashStr(String(this.generateDateNow)));
          productData.created_at = this.generateDateTime();
          const message = 'Product Insert Success!';
          const title = 'Success Message';
          this.productService.insertProduct(productData).subscribe(status => {
            this.toastrService.success(message, title);
            pform.resetForm();
            this.uploadFiles();
          });
        } else {
          this.toastrService.error('Please Choice Sub Category', 'Error');
        }
      } else {
            this.toastrService.error('Please Choice Main Category', 'Error');
      }
  }
  retriveMcat() {
    this.mcategoryService.retrieveMcats().subscribe(mCatData => {
      this.mcats$.next(mCatData.data);
    });
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
  onSelectScat(event) {
    this.sCatid = event.target.value;
  }

  retrieveScats(mCatid) {
    this.scategoryService.retrieveScatsiD(mCatid).subscribe(subCatData => {
      this.scats$.next(subCatData.data);
    });
  }
}
