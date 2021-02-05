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
  createSubCat( mCatid: number, name: string, created_at: string, slug: string) {
    const sCat: ScategoryModel = {name, mcat: mCatid, slug, created_at };
    return this.http.post(URL_HOST + '/api/sub_category', sCat);
  }
  editSubView(id): Observable<any> {
    return this.http.get(URL_HOST + '/api/sub_category/retrieve_single_sc?id=' + id);
  }

  updateScat(id: number, slug: string, mcat: number, created_at: string, name: string, updated_at: string) {
    const scatData: ScategoryModel = { id, name, mcat, created_at, slug, updated_at};
    return this.http.put(URL_HOST + '/api/sub_category/', scatData);
  }
  deleteScat(slug): Observable<any> {
    return this.http.delete(URL_HOST + '/api/sub_category?id=' + slug );
  }
}
