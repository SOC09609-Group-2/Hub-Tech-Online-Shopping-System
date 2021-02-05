import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FaqModel } from '../../../../models/faq/faq.model';
import { FaqService } from '../../../../services/faq/faq.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-faq-dashboard',
  templateUrl: './insert-faq.component.html',
  styleUrls: ['./insert-faq.component.scss'],
  providers: [FaqService]
})
export class InsertFaqComponent implements OnInit {
  uniqueSlug: string;
  generateDateNow: string;
  isLoading = false;
  constructor(private http: HttpClient, private faqService: FaqService) { }
  ngOnInit(): void {
  }
  onCreatefaq(form: NgForm, faqData: FaqModel) {
    this.isLoading = true;
    const message = 'Faq Insert Success!';
    const title = 'Success Message';
    this.faqService.createAndStoreFaq(faqData.question, faqData.answer, this.uniqueNumber(), this.generateDateTime()).subscribe(
      status => {
        this.faqService.successAlert(message, title);
        this.isLoading = false;
        form.resetForm();
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
}
