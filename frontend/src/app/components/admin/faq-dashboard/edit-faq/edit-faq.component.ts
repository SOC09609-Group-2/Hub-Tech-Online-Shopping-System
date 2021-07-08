import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FaqService} from '../../../../services/faq/faq.service';
import {FaqModel} from '../../../../models/faq/faq.model';

@Component({
  selector: 'app-edit-faq',
  templateUrl: './edit-faq.component.html',
  styleUrls: ['./edit-faq.component.scss']
})
export class EditFaqComponent implements OnInit {
  isLoading = false;
  validationError = [];
  faqs$ = [];
  uniqueSlug: string;
  generateDateNow: string;
  slug: string;
  constructor(private route: ActivatedRoute, private router: Router, private faqService: FaqService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.slug = params.slug;
        console.log(this.slug);
        this.editFaqView(this.slug);
      }
    );
  }

  editFaqView(slug) {
    this.faqService.editFaqView(slug).subscribe(faqsData => {
      this.faqs$.push(faqsData.data[0]);
    });
  }

  updateFaq(faqData: FaqModel) {
    const message = 'Faq Update Success!';
    const title = 'Update Message';
    this.isLoading = true;
    this.faqService.updateFaq(faqData.id, faqData.slug, faqData.question, faqData.answer, faqData.created_at, this.generateDateTime()).subscribe(
      status => {
        this.faqService.successAlert(message, title);
        this.isLoading = true;
        this.router.navigate(['/admin_dashboard/view_faq']);
      });
  }
  pad2(n) {
    return n < 10 ? '0' + n : n;
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
