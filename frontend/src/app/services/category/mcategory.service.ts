import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_HOST} from '../../utils/Setting';
import {McategoryModel} from '../../models/category/mcategory.model';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ScategoryModel} from '../../models/category/scategory.model';

@Injectable({ providedIn: 'root' })

export class McategoryService {
  constructor(private http: HttpClient) {}

  retrieveMcats(): Observable<any> {
    return this.http.get(URL_HOST + '/api/main_category');
  }
  retrieve_single_mc(id): Observable<any> {
    return this.http.get(URL_HOST + '/api/main_category/retrieve_single_mc?id=' + id);
  }

  retrieve_single_sc(id): Observable<any> {
    return this.http.get(URL_HOST + '/api/sub_category/retrieve_single_sc?id=' + id);
  }
}
