import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ScategoryService} from '../../../../services/category/scategory.service';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject} from 'rxjs';
import {McategoryModel} from '../../../../models/category/mcategory.model';
import {NgForm} from '@angular/forms';
import {ScategoryModel} from '../../../../models/category/scategory.model';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
  validationError = [];
  scats$ = new BehaviorSubject<McategoryModel[]>([]);
  editSlug;
  editName;
  editId;
  ediMcat;
  ediCD;
  generateDateNow: string;
  p;
  uniqueSlug: string;
  isEdit = false;
  isLoading = false;
  constructor(private route: ActivatedRoute,  private router: Router,  private toastr: ToastrService,
              private scategoryService: ScategoryService) { }

  mCatid: number;
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.mCatid = params.id;
      }
    );
    this.retrieveScats(this.mCatid);
  }
  createSubCat(form: NgForm, sCategory: ScategoryModel) {
    this.isLoading = true;
    const message = 'Sub Category Insert Success!';
    const title = 'Success Message';
    this.scategoryService.createSubCat(this.mCatid, sCategory.name, this.generateDateTime(), this.uniqueNumber()).subscribe(status => {
      this.toastr.success(message, title);
      this.isLoading = false;
      form.resetForm();
      this.retrieveScats(this.mCatid);
    });
  }

  editScat(id) {
    this.scategoryService.editSubView(id).subscribe(scatsData => {
      this.editId = scatsData.data.id;
      this.ediMcat = scatsData.data.mcat;
      this.ediCD = scatsData.data.created_at;
      this.editSlug = scatsData.data.slug;
      this.editName = scatsData.data.name;
    });
    this.isEdit = true;
  }
  retrieveScats(mCatid) {
    this.scategoryService.retrieveScatsiD(mCatid).subscribe(subCatData => {
      this.scats$.next(subCatData.data);
    });
  }

  updateScat(scategoryModel: ScategoryModel) {
    this.isLoading = true;
    const message = 'Sub Category Update Success!';
    const title = 'Success Message';
    this.scategoryService.updateScat(scategoryModel.id, scategoryModel.slug, scategoryModel.mcat, scategoryModel.created_at, scategoryModel.name, this.generateDateTime()).subscribe(status => {
      this.toastr.success(message, title);
      this.isLoading = false;
      this.isEdit = false;
      this.retrieveScats(this.mCatid);
    });
  }

  deleteScat(slug) {
    const message = 'Sub Category Delete Success!';
    const title = 'Success Message';
    this.scategoryService.deleteScat(slug).subscribe(() => {
      this.toastr.success(message, title);
      this.retrieveScats(this.mCatid);
    });
  }

  cancelEdit(scatForm) {
    this.isEdit = false;
    scatForm.reset();
  }

  dateFormat(dateStr) {
    if (dateStr) {
      return  dateStr.replace('T', ' ');
    } else {
      return 'No Modified';
    }
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
}
