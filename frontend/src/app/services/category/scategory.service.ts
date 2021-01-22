import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_HOST} from '../../utils/Setting';
import {ScategoryModel} from '../../models/category/scategory.model';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
@Injectable({ providedIn: 'root' })

export class ScategoryService {
  constructor(private http: HttpClient) {}
  retrieveScatsiD(mCatid: number): Observable<any> {
    return this.http.get(URL_HOST + '/api/sub_category/?mid=' + mCatid);
  }

}
