import { Component, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {FaqService} from '../../../services/faq/faq.service';
import {BehaviorSubject} from 'rxjs';
import {FaqModel} from '../../../models/faq/faq.model';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  p;
  isLoading = false;
  faqs$ = new BehaviorSubject<FaqModel[]>([]);
  constructor(private faqService: FaqService) { }

  ngOnInit(): void {
    this.retrieveFaqs();
  }
  retrieveFaqs() {
    this.isLoading = false;
    this.faqService.retrieveFaqs().subscribe(faqsData => {
      this.faqs$.next(faqsData.data);
      this.isLoading = true;
    });
  }
}
