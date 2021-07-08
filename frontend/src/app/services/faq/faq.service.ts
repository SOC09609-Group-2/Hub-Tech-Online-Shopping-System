import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject, Subscription, throwError} from 'rxjs';
import { FaqModel } from '../../models/faq/faq.model';
import {URL_HOST} from '../../utils/Setting';
import {ToastrService} from 'ngx-toastr';
@Injectable({ providedIn: 'root' })

export class FaqService {
  constructor(private toastr: ToastrService, private http: HttpClient) {}

  createAndStoreFaq(question: string, answer: string, slug: string, created_at: string) {
    const faqData: FaqModel = { question, answer, slug, created_at };
    return this.http
      .post(
        URL_HOST + '/api/faq',
        faqData
      );
  }

  retrieveFaqs(): Observable<any> {
    return this.http.get(URL_HOST + '/api/faq');
  }

  updateFaq(id: number, slug: string, question: string, answer: string, created_at: string, updated_at: string) {
    const faqData: FaqModel = {id, slug, question, answer, created_at, updated_at };
    return this.http.put(URL_HOST + '/api/faq', faqData);
  }

  editFaqView(slug): Observable<any> {
    return this.http.get(URL_HOST + '/api/faq/edit?slug=' + slug);
  }

  deleteFaq(id): Observable<any> {
    return this.http.delete(URL_HOST + '/api/faq?id=' + id );
  }
  successAlert(message, title) {
    this.toastr.success(message, title);
  }

}
