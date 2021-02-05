import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {McategoryModel} from '../../../../models/category/mcategory.model';
import {McategoryService} from '../../../../services/category/mcategory.service';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';



@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.scss']
})
export class MainCategoryComponent implements OnInit {
  validationError = [];
  mcats$ = new BehaviorSubject<McategoryModel[]>([]);
  editSlug;
  editName;
  editId;
  generateDateNow: string;
  p;
  uniqueSlug: string;
  isEdit = false;
  isLoading = false;
  constructor(private toastr: ToastrService, private router: Router, private mcategoryService: McategoryService) { }

  ngOnInit(): void {
    this.retrieveMcats();
  }
  createMainCat(form: NgForm, mCategory: McategoryModel) {
    this.isLoading = true;
    const message = 'Main Category Insert Success!';
    const title = 'Success Message';
    this.mcategoryService.createMainCat(mCategory.name, this.uniqueNumber(), this.generateDateTime()).subscribe(status => {
      this.toastr.success(message, title);
      this.isLoading = false;
      form.resetForm();
      this.retrieveMcats();
    });
  }
  retrieveMcats() {
    this.mcategoryService.retrieveMcatsByID().subscribe(faqsData => {
      this.mcats$.next(faqsData.data);
    });
  }
  editMcat(id) {
    this.mcategoryService.editMactView(id).subscribe(mcatsData => {
      this.editId = mcatsData.data.id;
      this.editSlug = mcatsData.data.slug;
      this.editName = mcatsData.data.name;
    });
    this.isEdit = true;
  }
  cancelEdit(mcatForm) {
    this.isEdit = false;
    mcatForm.reset();
  }
  updateMcat(mcategoryModel: McategoryModel) {
    this.isLoading = true;
    const message = 'Main Category Update Success!';
    const title = 'Success Message';
    this.mcategoryService.updateMact(mcategoryModel.id, this.generateDateTime(), mcategoryModel.name).subscribe(status => {
      this.toastr.success(message, title);
      this.isLoading = false;
      this.isEdit = false;
      this.retrieveMcats();
    });
  }

  deleteMcat(id) {
    const message = 'Main Category Delete Success!';
    const title = 'Success Message';
    this.mcategoryService.deleteMcat(id).subscribe(() => {
      this.toastr.success(message, title);
      this.retrieveMcats();
    });
  }
  viewSubCat(id) {
    this.router.navigate(['admin_dashboard', id, 'sub_category']);
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
