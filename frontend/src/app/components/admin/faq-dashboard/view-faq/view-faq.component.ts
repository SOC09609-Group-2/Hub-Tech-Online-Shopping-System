import {Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef, ElementRef} from '@angular/core';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {FaqModel} from '../../../../models/faq/faq.model';
import {HttpClient} from '@angular/common/http';
import {FaqService} from '../../../../services/faq/faq.service';
import {ViewModalComponent} from '../view-modal/view-modal.component';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-faq',
  templateUrl: './view-faq.component.html',
  styleUrls: ['./view-faq.component.scss']
})
export class ViewFaqComponent implements OnInit {
  isLoading = false;
  faqs$ = new BehaviorSubject<FaqModel[]>([]);
  p;
  elements: any = [];
  modalRef: MDBModalRef;

  constructor(private modalService: MDBModalService, private router: Router,
              private http: HttpClient, private faqService: FaqService) {
  }

  ngOnInit() {
   this.retrieveFaqs();
  }


  faqModal(header, text) {
    const modalOptions = {
      data: {
        heading: header,
        content: text
      }
    };
    this.modalRef = this.modalService.show(ViewModalComponent, modalOptions);
  }
  retrieveFaqs() {
    this.faqService.retrieveFaqs().subscribe(faqsData => {
      this.faqs$.next(faqsData.data);
    });
  }
  deleteFaq(id) {
    const message = 'Faq Delete Success!';
    const title = 'Success Message';
    this.faqService.deleteFaq(id).subscribe(() => {
      this.faqService.successAlert(message, title);
      this.retrieveFaqs();
    });
  }
  editFaq(slug) {
    this.router.navigate(['/admin_dashboard/edit_faq', slug ]);
  }
  dateFormat(dateStr) {
    if (dateStr) {
      return  dateStr.replace('T', ' ');
    } else {
      return 'No Modified';
    }
   }

}
