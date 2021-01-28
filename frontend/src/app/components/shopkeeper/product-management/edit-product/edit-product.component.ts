import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProductModel} from '../../../../models/product/product.model';
import {BehaviorSubject} from 'rxjs';
import {ScategoryModel} from '../../../../models/category/scategory.model';
import {McategoryModel} from '../../../../models/category/mcategory.model';
import {ToastrService} from 'ngx-toastr';
import {McategoryService} from '../../../../services/category/mcategory.service';
import {ScategoryService} from '../../../../services/category/scategory.service';
import {ProductService} from '../../../../services/product/product.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UploadFileService} from '../../../../services/UploadFileService ';
import {Md5} from 'ts-md5';
import {AuthenticationService} from '../../../../services/login/authentication.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit, OnDestroy {
  validationError = [];
  mCatName: string;
  mcatID: string;
  subCatID: string;
  sCatName: string;
  fileNameArray = [];
  rawfileName;
  fileName;
  products$ = [];
  slug: string;
  pID: string;
  selectedFiles: FileList;
  myFiles: string [] = [];
  fileNames: string [] = [];
  isLoading = false;
  mCatid = '';
  sCatid = '';
  uniqueSlug: string;
  generateDateNow: string;
  isSelectFile = false;
  isSelectMcat = false;
  isSelectScat = false;
  scats$ = new BehaviorSubject<ScategoryModel[]>([]);
  mcats$ = new BehaviorSubject<McategoryModel[]>([]);
  constructor(private toastr: ToastrService, private uploadService: UploadFileService,
              private auth: AuthenticationService, private mcategoryService: McategoryService, private scategoryService: ScategoryService, private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.slug = localStorage.getItem('slug');
    this.pID = localStorage.getItem('productID');
    this.mcatID = localStorage.getItem('mcatID');
    this.subCatID = localStorage.getItem('subCatID');
    if (this.slug != null && this.mcatID != null && this.subCatID != null) {
      this.editProView(this.slug);
    } else {
      this.editProView('s');
    }

  }
  editProView(slug) {
    this.productService.editProductView(slug).subscribe(prosData => {
      this.products$.push(prosData.data[0]);
      console.log(this.mcatID);
      this.getCatName(this.mcatID);
      this.getSubCatName(this.subCatID);
      this.retriveMcat(this.mcatID);
      if (this.isSelectMcat == false) {
        this.retrieveScats(this.mcatID, this.subCatID);
      }
    });
  }
      updateProduct(pform: NgForm, productData: ProductModel) {
    productData.id = Number(this.pID);
    productData.slug = this.slug;
    productData.created_at = this.products$[0].created_at;
    productData.updated_at = this.generateDateTime();
    if (this.subCatID != null || this.subCatID != '0') {
      if (!this.isSelectMcat) {
        console.log(this.mcatID);
        console.log(this.subCatID);
        productData.cat_id = Number(this.mcatID);
        productData.sub_cat_id = Number(this.subCatID);
        productData.supplier_id = Number(this.getID());
      } else {
        console.log(this.mCatid);
        console.log('sub cat' + this.sCatid);
        productData.cat_id = Number(this.mCatid);
        productData.sub_cat_id = Number(this.sCatid);
        productData.supplier_id = Number(this.getID());
      }
      if (this.isSelectScat) {
        productData.sub_cat_id = Number(this.sCatid);
      }

      if (this.isSelectFile == true) {
        productData.image_name = String(this.fileName);
        this.uploadFiles();
      } else {
        productData.image_name = productData['old_pict'];
      }
      this.isLoading = true;
      this.productService.updateProduct(productData).subscribe(status => {
          this.toastr.success('Update Product Success', 'Success Message');
          this.isLoading = false;
          this.router.navigateByUrl('/shopkeeper_dashboard/view_products');
      });
    }

  }

  onSelectMcat(event) {
    this.mCatid = event.target.value;
    this.isSelectMcat = true;
    this.retrieveScats(this.mCatid, this.subCatID);
  }
  onSelectScat(event) {
    this.sCatid = event.target.value;
    this.isSelectScat = true;
  }
  retrieveScats(mCatid, sCatid) {
    this.scategoryService.retrieveScatsiD(mCatid).subscribe(subCatData => {
      if (this.isSelectMcat == false) {
        subCatData['data'].forEach(function(item, index) {
          if (item.id == sCatid) {
            subCatData['data'].splice(index, 1);
          }
        });
      }
      this.scats$.next(subCatData.data);
    });
  }
  retriveMcat(mCatID) {
    this.mcategoryService.retrieveMcats().subscribe(mCatData => {
      // tslint:disable-next-line:only-arrow-functions
      mCatData['data'].forEach(function(item, index) {
        if (item.id == mCatID) {
          mCatData['data'].splice(index, 1);
        }
      });
      this.mcats$.next(mCatData.data);
    });
  }

  getCatName(id) {
     this.mcategoryService.retrieve_single_mc(id).subscribe(catData => {
       this.mCatName = catData.data.name;
     });
  }
  getSubCatName(id) {
     this.mcategoryService.retrieve_single_sc(id).subscribe(catData => {
       this.sCatName = catData.data.name;
     });
  }
  getID() {
    return this.auth.getId();
  }

  onFileSeletected(event) {
    this.isSelectFile = true;
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


  ngOnDestroy(): void {
    this.scats$.unsubscribe();
    this.mcats$.unsubscribe();
  }
  pad2(n) {
    return n < 10 ? '0' + n : n;
  }
  uniqueNumber(): string {
    const date = new Date();
    // tslint:disable-next-line:max-line-length
    this.uniqueSlug = date.getFullYear().toString() + this.pad2(date.getMonth() + 1) +
      this.pad2( date.getDate()) + this.pad2( date.getHours() ) + this.pad2( date.getMinutes() );
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

}
